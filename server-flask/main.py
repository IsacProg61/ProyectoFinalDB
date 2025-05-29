from flask import Flask, request, jsonify
from flask_cors import CORS
from functions.clients import allClients, agregar_cliente, borrar_cliente, actualizar_cliente
from functions.services import agregar_servicio, ver_servicios, actualizar_servicio, eliminar_servicio
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

@app.route("/VerService", methods=["GET"])
def route_ver_servicios():
    return ver_servicios()

@app.route("/actualizarService", methods=["PUT"])
def route_actualizar_servicio():
    return actualizar_servicio(request)

@app.route("/BorrarService", methods=["DELETE"])
def route_eliminar_servicio():
    return eliminar_servicio(request)

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
    return ver_knowledge()

@app.route("/borrarCliente", methods=["DELETE"])
def route_borrar_cliente():
    return borrar_cliente(request)

@app.route("/actualizarCliente", methods=["PUT"])
def route_actualizar_cliente():
    return actualizar_cliente(request)


if __name__ == "__main__":
    app.run(debug=True)

