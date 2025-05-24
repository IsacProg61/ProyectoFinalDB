from flask import Flask, request, jsonify
from flask_cors import CORS
import oracledb

app = Flask(__name__)
CORS(app)

def conectar_db():
    return oracledb.connect(
        user="alumno",
        password="alumno123",
        dsn="localhost:1521/XEPDB1"
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
                # Agrega más campos si tu tabla tiene más
            })

        cursor.close()
        conn.close()
        return jsonify(clientes)

    except Exception as e:
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

if __name__ == "__main__":
    app.run(debug=True)
