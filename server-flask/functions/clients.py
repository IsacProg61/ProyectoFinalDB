from flask import jsonify, request
from functions.db import conectar_db

def allClients():
    try:
        print("allClients ejecutado") 
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

def agregar_cliente(request):
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No se recibieron datos"}), 400
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

def borrar_cliente(request):
    try:
        data = request.get_json()
        id_cliente = data.get('id_cliente')
        if not id_cliente:
            return jsonify({"error": "Falta el id_cliente"}), 400

        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute(
            f"DELETE FROM cliente WHERE id_cliente = '{id_cliente}'",
        )
        conn.commit()
        filas_afectadas = cursor.rowcount
        cursor.close()
        conn.close()

        if filas_afectadas == 0:
            return jsonify({"error": "No se encontró el cliente"}), 404

        return jsonify({"message": "Cliente borrado exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def actualizar_cliente(request):
    try:
        data = request.get_json()
        id_cliente = data.get('id_cliente')
        nombre_completo = data.get('nombre_completo')
        numero = data.get('numero')

        if not id_cliente or not nombre_completo or not numero:
            return jsonify({"error": "Faltan datos para actualizar"}), 400

        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute(
            f"UPDATE cliente SET nombre_completo = '{nombre_completo}', numero = {numero} WHERE id_cliente = '{id_cliente}'"
        )
        conn.commit()
        filas_afectadas = cursor.rowcount
        cursor.close()
        conn.close()

        if filas_afectadas == 0:
            return jsonify({"error": "No se encontró el cliente para actualizar"}), 404

        return jsonify({"message": "Cliente actualizado exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
