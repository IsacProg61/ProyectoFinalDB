from flask import Flask, request, jsonify
from flask_cors import CORS
import oracledb

app = Flask(__name__)
CORS(app)

def conectar_db():
    return oracledb.connect(
        user="ADMIN",
        password="ContraRECSIN61%",
        dsn="recsin_high",
        config_dir= r"C:\Users\isaac\OneDrive\Documentos\recsin_wallet",
        wallet_location= r"C:\Users\isaac\OneDrive\Documentos\recsin_wallet",
        wallet_password="ContraRECSIN61%"
    )

# Ruta para consultar clientes
@app.route("/allClients", methods=["GET"])
def allClients():
    try:
        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM cliente")

        clientes = []
        for row in cursor:
            clientes.append({
                "id_cliente": row[0],
                "nombre_completo": row[1],
                "numero": row[2]
                
            })

        cursor.close()
        conn.close()
        return jsonify(clientes)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# Ruta para agregar servicios
@app.route("/agregarServicio", methods=["POST"])
def agregar_servicio():
    try:
        data = request.json
        print("Datos recibidos en agregar_servicio:", data)
        
        # Extraer los campos enviados desde el front-end
        id_servicio = data.get("id_servicio")  # Opcional si la BD lo autogenera
        equipo = data.get("equipo")
        descripcion = data.get("descripcion")
        fecha_entrega = data.get("fecha_entrega")  # Se espera en formato 'YYYY-MM-DD'
        id_empleado = data.get("id_empleado")
        costo = data.get("costo")
        id_sucursal = data.get("id_sucursal")
        
        # Validación: se requiere que, al menos, los siguientes campos se envíen.
        if equipo is None or descripcion is None or fecha_entrega is None or \
           id_empleado is None or costo is None or id_sucursal is None:
            return jsonify({"error": "Faltan datos requeridos para el servicio."}), 400
        
        # Conversión de datos a tipos correctos
        try:
            costo = float(costo)
            id_empleado = int(id_empleado)
            id_sucursal = int(id_sucursal)
            if id_servicio is not None:
                id_servicio = int(id_servicio)
        except ValueError:
            return jsonify({"error": "Error en el formato de los datos numéricos."}), 400
        #Validamos la fecha, especificamente el formato, segun la base de datos es 'YYYY-MM-DD'
        conn = conectar_db()
        cursor = conn.cursor()
        
        # Preparar la consulta según si se envía o no id_servicio
        if id_servicio is None:
            # Se omite id_servicio para que se autogenere
            query = """
                INSERT INTO servicios 
                (equipo, descripcion, fecha_entrega, id_empleado, costo, id_sucursal)
                VALUES (:equipo, :descripcion, TO_DATE(:fecha_entrega, 'YYYY-MM-DD'), :id_empleado, :costo, :id_sucursal)
            """
            params = {
                "equipo": equipo,
                "descripcion": descripcion,
                "fecha_entrega": fecha_entrega,
                "id_empleado": id_empleado,
                "costo": costo,
                "id_sucursal": id_sucursal
            }
        else:
            # Si se envía id_servicio, incluirlo en la consulta
            query = """
                INSERT INTO servicios 
                (id_servicio, equipo, descripcion, fecha_entrega, id_empleado, costo, id_sucursal)
                VALUES (:id_servicio, :equipo, :descripcion, TO_DATE(:fecha_entrega, 'YYYY-MM-DD'), :id_empleado, :costo, :id_sucursal)
            """
            params = {
                "id_servicio": id_servicio,
                "equipo": equipo,
                "descripcion": descripcion,
                "fecha_entrega": fecha_entrega,
                "id_empleado": id_empleado,
                "costo": costo,
                "id_sucursal": id_sucursal
            }
        
        cursor.execute(query, params)
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Servicio agregado exitosamente."}), 201

    except Exception as e:
        print("Error en agregar_servicio:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/agregar", methods=["POST"])
def agregar_cliente():
    try:
        data = request.json
        print("Datos recibidos:", data) 

        id_cliente = data.get('id_cliente')
        nombre_completo = data.get('nombre_completo')
        numero = data.get('numero')

        # Validación de datos
        if id_cliente is None or nombre_completo is None or numero is None:
            return jsonify({"error": "Faltan datos (None)"}), 400
        # Convertir los datos a sus tipos correctos
        try:
            id_cliente = str(id_cliente)
            nombre_completo = str(nombre_completo)
            numero = int(numero)
        except ValueError:
            return jsonify({"error": "Estan mal escritos los datos"}), 400

        conn = conectar_db()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO cliente (id_cliente, nombre_completo, numero) VALUES (:id_cliente, :nombre_completo, :numero)",
            {"id_cliente": id_cliente, "nombre_completo": nombre_completo, "numero": numero}
        )

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Cliente agregado exitosamente"}), 201

    except Exception as e:
        print("Error en agregar_cliente:", e)  # Muestra el error real en consola
        return jsonify({"error": str(e)}), 500

@app.route("/agregarKnowledge", methods=["POST"])
def agregar_knowledge():
    try:
        data = request.json
        print("Datos recibidos en agregar_knowledge:", data)

        cliente = data.get('cliente')
        servicio = data.get('servicio')
        fecha_salida = data.get('fecha_salida')
        solucion = data.get('solucion')

        # Validación de datos
        if cliente is None or servicio is None or fecha_salida is None or solucion is None:
            return jsonify({"error": "Faltan datos para agregar knowledge."}), 400

        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO servicios_hechos (id_cliente, id_servicio, fecha_salida, solucion)
            VALUES (:cliente, :servicio, TO_DATE(:fecha_salida, 'YYYY-MM-DD'), :solucion)
            """,
            {"cliente": cliente, "servicio": servicio, "fecha_salida": fecha_salida, "solucion": solucion}
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Knowledge agregado exitosamente"}), 201
    except Exception as e:
        print("Error en agregar_knowledge:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/borrarKnowledge", methods=["DELETE"])
def borrar_knowledge():
    try:
        data = request.json
        cliente = data.get('cliente')
        servicio = data.get('servicio')
        print("Datos recibidos en borrar_knowledge:", cliente, servicio)
        if not cliente or not servicio:
            return jsonify({"error": "Faltan datos para borrar knowledge."}), 400
        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute(
            f"""
            DELETE FROM ADMIN.servicios_hechos WHERE id_cliente = '{cliente}' AND id_servicio = '{servicio}'
            """
        )
        deleted_count = cursor.rowcount
        print(f"Registros borrados: {deleted_count}")
        conn.commit()
        cursor.close()
        conn.close()
        if deleted_count == 0:
            return jsonify({"error": "No se encontró el registro para borrar."}), 404
        return jsonify({"message": "Knowledge borrado exitosamente."}), 200
    except Exception as e:
        print("Error en borrar_knowledge:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/actualizarKnowledge", methods=["PUT"])
def actualizar_knowledge():
    try:
        data = request.json
        cliente = data.get('cliente')
        servicio = data.get('servicio')
        fecha_salida = data.get('fecha_salida')
        print(fecha_salida)
        solucion = data.get('solucion')
        print("Datos recibidos en actualizar_knowledge:", cliente, servicio, fecha_salida, solucion)
        if not cliente or not servicio or not fecha_salida or not solucion:
            return jsonify({"error": "Faltan datos para actualizar knowledge."}), 400
        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute(
            f"""
            UPDATE ADMIN.servicios_hechos 
            SET fecha_salida = TO_DATE('{fecha_salida}', 'YYYY-MM-DD'), solucion = '{solucion}'
            WHERE id_cliente = '{cliente}' AND id_servicio = '{servicio}'
            """
        )
        updated_count = cursor.rowcount
        print(f"Registros actualizados: {updated_count}")
        conn.commit()
        cursor.close()
        conn.close()
        if updated_count == 0:
            return jsonify({"error": "No se encontró el registro para actualizar."}), 404
        return jsonify({"message": "Knowledge actualizado exitosamente."}), 200
    except Exception as e:
        print("Error en actualizar_knowledge:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/verKnowledge", methods=["GET"])
def ver_knowledge():
    try:
        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id_cliente, id_servicio, TO_CHAR(fecha_salida, 'YYYY-MM-DD'), solucion
            FROM ADMIN.servicios_hechos
            ORDER BY fecha_salida DESC
        """)
        registros = []
        for row in cursor:
            registros.append({
                "id_cliente": row[0],
                "id_servicio": row[1],
                "fecha_salida": row[2],
                "procedimiento": row[3]
            })
        cursor.close()
        conn.close()
        return jsonify(registros)
    except Exception as e:
        print("Error en ver_knowledge:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

