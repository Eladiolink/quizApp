import os
import mysql.connector
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

def connect_database():
    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )

        if connection.is_connected():
            print("✅ Conexão estabelecida com sucesso!")
            return connection

    except mysql.connector.Error as e:
        print(f"❌ Erro ao conectar: {e}")
        return None