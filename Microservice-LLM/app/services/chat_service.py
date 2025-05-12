from app.models.chat_model import ChatRequest, ChatMessage, User, fetch_chat_requests_from_db, fetch_question_answered
from app.integrations.llm import inicializar_llm, fazer_pergunta
from app.core.task import processar_chamada_llm
from app.models.atividades_corrigida_model import get_atividades_corrigida


def get_mock_response() -> list[User]:
    res = fetch_chat_requests_from_db()
    print(res)
    resposta = "OK!"
    return res

def set_activity_correction(activity_id: int, user_id: int):
    atividades_respondidas = fetch_question_answered(activity_id,user_id)
    
    if len(atividades_respondidas) == 0:
        return ChatMessage(message="O usuário não respondeu questões dessa atividade, ou ela não existe!", isValid=False)
        
    atividades_corrigida = get_atividades_corrigida(activity_id,user_id)
   
    print(atividades_corrigida)
    if len(atividades_corrigida)>0:
        return ChatMessage(message="Atividade já processada ou em processamento!", isValid=False)
       
    tarefa = processar_chamada_llm.delay({"activity_id":activity_id,"user_id":user_id})
    
    return ChatMessage(message="Inicio da correção da atividade {activity_id} para o usuário: {user_id}", isValid=True)