from app.models.chat_model import ChatRequest, ChatMessage, User, fetch_chat_requests_from_db, fetch_question_answered
from app.integrations.llm import inicializar_llm, fazer_pergunta
from app.core.task import processar_chamada_llm


def get_mock_response() -> list[User]:
    res = fetch_chat_requests_from_db()
    print(res)
    resposta = "OK!"
    return res

def set_activity_correction(activity_id: int, user_id: int):
    res = fetch_question_answered(activity_id,user_id)
    tarefa = processar_chamada_llm.delay({"activity_id":activity_id,"user_id":user_id})
    print(len(res))
    return f"activity: {activity_id} for user: {user_id}"