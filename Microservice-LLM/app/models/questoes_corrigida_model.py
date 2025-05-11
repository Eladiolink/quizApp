from app.db.database import get_mysql_connection
from mysql.connector import IntegrityError
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class QuestaoCorrigidaRequest(BaseModel):
    correcao: str
    modelo: str
    id_cliente: int
    id_questao: int

def adicionar_questoes_corrigida(questao: QuestaoCorrigidaRequest):
    try:
        connection = get_mysql_connection()
        cursor = connection.cursor()
        query = """
            INSERT INTO questoes_corrigida (correcao, modelo, id_cliente, id_questao)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (
            questao.correcao,
            questao.modelo,
            questao.id_cliente,
            questao.id_questao
        ))
        connection.commit()
        cursor.close()
        connection.close()
        return True
    except IntegrityError as e:
        print(f"Erro de integridade: {e}")
        return False
