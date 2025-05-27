import oracledb

def conectar_db():
    return oracledb.connect(
        user="alumno",
        password="alumno123",
        dsn="localhost:1521/XEPDB1"
    )
