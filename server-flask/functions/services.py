from flask import jsonify, request
from functions.db import conectar_db

def agregar_servicio(request):
    try:
        conn= conectar_db()
        cursor = conn.cursor()
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
        if equipo is None or descripcion is None or fecha_entrega is None or id_empleado is None or costo is None or id_sucursal is None:
            return jsonify({"error": "Faltan datos requeridos para el servicio."}), 400
        
        # Conversión de datos a tipos correctos
        try:
            costo = str(costo)
            #id_empleado = int(id_empleado)
            #id_sucursal = int(id_sucursal)
            #if id_servicio is not None:
            #    id_servicio = int(id_servicio)
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