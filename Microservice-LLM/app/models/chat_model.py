from pydantic import BaseModel
from app.db.database import get_mysql_connection, get_cursor_instance
from datetime import datetime

class ChatRequest(BaseModel):
    user: str
    message: str

class ChatMessage(BaseModel):
    isValid: bool
    message: str

class User(BaseModel):
    id: int
    nome: str
    email: str
    tipo: str
    created_at: datetime

def fetch_chat_requests_from_db():
    conn = get_mysql_connection()
    connection = get_cursor_instance()
    connection.execute("SELECT * FROM usuario")
    users = connection.fetchall()
    connection.close()
    conn.close()
    print(type(users))
 
    return users

def fetch_question_answered(activity_id: int, user_id: int):
    conn = get_mysql_connection()
    connection = get_cursor_instance()
    query = """
                SELECT DISTINCT q.id AS id
                            , q.questao AS questao
                            , q.opcao_a
                            , q.opcao_b
                            , q.opcao_c
                            , q.opcao_d
                            , q.opcao_e
                            , q.opcao_correta
                            , aq.opcao AS questao_respondida
                FROM questoes_respondida aq
                JOIN questoes_atividade q ON aq.id_questao = q.id
                JOIN usuario c ON aq.id_cliente = c.id
                JOIN atividade a ON q.id_atividade = a.id
                WHERE c.id = %s
                AND a.id = %s
            """

    connection.execute(query, (user_id, activity_id))

    result = connection.fetchall()
    connection.close()
    conn.close()
    return result