from flask import jsonify, request
from functions.db import conectar_db

# Función para agregar conocimiento almacenado
def agregar_knowledge(request):
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

# Función para borrar el conocimiento almacenado
def borrar_knowledge(request):
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

# Función para actualizar el conocimiento almacenado
def actualizar_knowledge(request):
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

# Función para ver el conocimiento almacenado
def ver_knowledge(request):
    try:
        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id_cliente, id_servicio, TO_CHAR(fecha_salida, 'YYYY-MM-DD'), solucion
            FROM servicios_hechos
            ORDER BY fecha_salida DESC
        """)
        registros = []
        for row in cursor:
            registros.append({
                "id_cliente": row[0],
                "id_servicio": row[2],
                "fecha_salida": row[1],
                "procedimiento": row[3]
            })
        cursor.close()
        conn.close()
        return jsonify(registros)
    except Exception as e:
        print("Error en ver_knowledge:", e)
        return jsonify({"error": str(e)}), 500
