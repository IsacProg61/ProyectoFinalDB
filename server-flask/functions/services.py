from flask import jsonify, request
from functions.db import conectar_db

def agregar_servicio(request):
    try:
        data = request.json
        print("Datos recibidos en agregar_servicio:", data)

        id_servicio = data.get("id_servicio")  # Opcional
        equipo = data.get("equipo")
        descripcion = data.get("descripcion")
        fecha_entrega = data.get("fecha_entrega")
        id_empleado = data.get("id_empleado")
        costo = str(data.get("costo"))
        id_sucursal = data.get("id_sucursal")

        if not all([equipo, descripcion, fecha_entrega, id_empleado, costo, id_sucursal]):
            return jsonify({"error": "Faltan datos requeridos para el servicio."}), 400

        conn = conectar_db()
        cursor = conn.cursor()

        if id_servicio is None:
            query = """
                INSERT INTO servicios 
                (equipo, descripcion, fecha_entrega, id_empleado, costo, id_sucursal)
                VALUES (:equipo, :descripcion, TO_DATE(:fecha_entrega, 'YYYY-MM-DD'), :id_empleado, :costo, :id_sucursal)
            """
            params = { "equipo": equipo, "descripcion": descripcion, "fecha_entrega": fecha_entrega, "id_empleado": id_empleado, "costo": costo, "id_sucursal": id_sucursal }
        else:
            query = """
                INSERT INTO servicios 
                (id_servicio, equipo, descripcion, fecha_entrega, id_empleado, costo, id_sucursal)
                VALUES (:id_servicio, :equipo, :descripcion, TO_DATE(:fecha_entrega, 'YYYY-MM-DD'), :id_empleado, :costo, :id_sucursal)
            """
            params = { "id_servicio": id_servicio, "equipo": equipo, "descripcion": descripcion, "fecha_entrega": fecha_entrega, "id_empleado": id_empleado, "costo": costo, "id_sucursal": id_sucursal }

        cursor.execute(query, params)
        conn.commit()
        return jsonify({"message": "Servicio agregado exitosamente."}), 201
    except Exception as e:
        print("Error en agregar_servicio:", e)
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

def ver_servicios():
    try:
        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id_servicio, equipo, descripcion, TO_CHAR(fecha_entrega, 'YYYY-MM-DD'), id_empleado, costo, id_sucursal
            FROM servicios
            ORDER BY fecha_entrega DESC
        """)
        servicios = [{
            "id_servicio": row[0],
            "equipo": row[1],
            "descripcion": row[2],
            "fecha_entrega": row[3],
            "id_empleado": row[4],
            "costo": row[5],
            "id_sucursal": row[6]
        } for row in cursor]
        return jsonify(servicios)
    except Exception as e:
        print("Error en ver_servicios:", e)
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

def actualizar_servicio(request):
    try:
        data = request.json
        id_servicio = data.get("id_servicio")
        equipo = data.get("equipo")
        descripcion = data.get("descripcion")
        fecha_entrega = data.get("fecha_entrega")
        id_empleado = data.get("id_empleado")
        costo = str(data.get("costo"))
        id_sucursal = data.get("id_sucursal")

        if not id_servicio or not all([equipo, descripcion, fecha_entrega, id_empleado, costo, id_sucursal]):
            return jsonify({"error": "Faltan datos para actualizar servicio."}), 400

        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE servicios
            SET equipo = :equipo, descripcion = :descripcion, fecha_entrega = TO_DATE(:fecha_entrega, 'YYYY-MM-DD'),
                id_empleado = :id_empleado, costo = :costo, id_sucursal = :id_sucursal
            WHERE id_servicio = :id_servicio
        """, {
            "equipo": equipo,
            "descripcion": descripcion,
            "fecha_entrega": fecha_entrega,
            "id_empleado": id_empleado,
            "costo": costo,
            "id_sucursal": id_sucursal,
            "id_servicio": id_servicio
        })

        if cursor.rowcount == 0:
            return jsonify({"error": "No se encontró el servicio para actualizar."}), 404

        conn.commit()
        return jsonify({"message": "Servicio actualizado exitosamente."}), 200
    except Exception as e:
        print("Error en actualizar_servicio:", e)
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

def eliminar_servicio(request):
    try:
        data = request.json
        id_servicio = data.get("id_servicio")
        if not id_servicio:
            return jsonify({"error": "Falta el id del servicio a eliminar."}), 400

        conn = conectar_db()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM servicios WHERE id_servicio = :id_servicio", {"id_servicio": id_servicio})

        if cursor.rowcount == 0:
            return jsonify({"error": "No se encontró el servicio a eliminar."}), 404

        conn.commit()
        return jsonify({"message": "Servicio eliminado exitosamente."}), 200
    except Exception as e:
        print("Error en eliminar_servicio:", e)
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()
