from app.db.database import get_mysql_connection, get_cursor_instance
from mysql.connector import IntegrityError

def cria_atividades_corrigida(activity_id: int, user_id: int):
    conn = get_mysql_connection()
    connection = get_cursor_instance()
    result = None
    
    try:
        query = """
                    INSERT atividades_corrigida(id_atividade,id_cliente,id_status) VALUES (%s,%s,1);
                """

        connection.execute(query, (activity_id,user_id))

        result = conn.commit()
    except IntegrityError as e:
        connection.close()
        print("Mensagem de Erro",e)
        return False
    
    connection.close()
 
    return True

def atualiza_atividades_corrigida(activity_id: int, user_id: int, status_id: int):
    conn = get_mysql_connection()
    connection = get_cursor_instance()
    print("UPDATANDO...")
    query = """
                UPDATE atividades_corrigida
                   SET id_status = %s
                WHERE id_atividade = %s
                AND id_cliente = %s;
            """

    connection.execute(query, (status_id, activity_id, user_id))

    result = conn.commit()
    connection.close()
    conn.close()
    return result

def get_atividades_corrigida(activity_id: int, user_id: int):
    conn = get_mysql_connection()
    connection = get_cursor_instance()
    print(activity_id,user_id)
    query = """
                SELECT *
                FROM atividades_corrigida ac
                WHERE ac.id_atividade = %s
                AND ac.id_cliente = %s
            """

    connection.execute(query, (activity_id, user_id))

    result = connection.fetchall()
    print(result)
    connection.close()
    conn.close()

    return result