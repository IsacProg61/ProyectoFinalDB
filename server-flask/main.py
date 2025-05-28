from flask import Flask, request, jsonify
from flask_cors import CORS
from functions.clients import allClients, agregar_cliente
from functions.services import agregar_servicio
from functions.db import conectar_db
from functions.knowledge import agregar_knowledge, borrar_knowledge, actualizar_knowledge, ver_knowledge

app = Flask(__name__)
CORS(app)

# Ruta para consultar clientes
@app.route("/allClients", methods=["GET"])
def route_all_clients():
    return allClients()

# Ruta para agregar servicios
@app.route("/agregarServicio", methods=["POST"])
def route_agregar_servicio():
    return agregar_servicio(request)

@app.route("/agregarCliente", methods=["POST"])
def route_agregar_cliente():
    return agregar_cliente(request)

@app.route("/agregarKnowledge", methods=["POST"])
def route_agregar_knowledge():
    return agregar_knowledge(request)

@app.route("/borrarKnowledge", methods=["DELETE"])
def route_borrar_knowledge():
    return borrar_knowledge(request)

@app.route("/actualizarKnowledge", methods=["PUT"])
def route_actualizar_knowledge():
    return actualizar_knowledge(request)

@app.route("/verKnowledge", methods=["GET"])
def route_ver_knowledge():
    return ver_knowledge(request)


if __name__ == "__main__":
    app.run(debug=True)

