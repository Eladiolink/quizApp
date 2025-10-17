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

def adicionar_questoes_corrigida1(questao: QuestaoCorrigidaRequest):
    try:
        connection = get_mysql_connection()
        cursor = connection.cursor()

        # Máximo suportado pelo TEXT no MySQL
        MAX_TEXT_LENGTH = 60000 

        # Garante que não vai ultrapassar o limite
        correcao = questao.correcao
        if correcao and len(correcao) > MAX_TEXT_LENGTH:
            correcao = correcao[:MAX_TEXT_LENGTH]

        query = """
            INSERT INTO questoes_corrigida (correcao, modelo, id_cliente, id_questao)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (
            correcao,
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
