import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

# Variável global para armazenar a conexão
_conexao_mysql = None

def get_mysql_connection():
    global _conexao_mysql
    if _conexao_mysql is None or not _conexao_mysql.is_connected():
        _conexao_mysql = mysql.connector.connect(
            host=os.getenv("MYSQL_HOST"),
            port=int(os.getenv("MYSQL_PORT", 3306)),
            user=os.getenv("MYSQL_USER"),
            password=os.getenv("MYSQL_PASSWORD"),
            database=os.getenv("MYSQL_DATABASE")
        )
    return _conexao_mysql

def get_cursor_instance():
    return get_mysql_connection().cursor(dictionary=True)
