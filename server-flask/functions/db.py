import oracledb

def conectar_db():
    return oracledb.connect(
        user="ADMIN",
        password="ContraRECSIN61%",
        dsn="recsin_high",
        config_dir= r"/home/lucas/Documents/Programas/Wallet_RECSIN",
        wallet_location=r"/home/lucas/Documents/Programas/Wallet_RECSIN",
        wallet_password="ContraRECSIN61%"
    )
