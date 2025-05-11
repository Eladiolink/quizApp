from celery import Celery
from app.integrations.llm import inicializar_llm, fazer_pergunta
from app.models.chat_model import fetch_question_answered
from app.models.atividades_corrigida_model import cria_atividades_corrigida, atualiza_atividades_corrigida
from app.models.questoes_corrigida_model import adicionar_questoes_corrigida, QuestaoCorrigidaRequest


celery_app = Celery("worker", broker="redis://localhost:6379/0")

@celery_app.task
def processar_chamada_llms(prompt):
    # Simula chamada demorada
    import time
    
    llm = inicializar_llm()

    pergunta = "Quanto é 4x4?"
    resposta = fazer_pergunta(llm, pergunta)
    return f"Resposta gerada com prompt: {resposta}"

@celery_app.task
def processar_chamada_llm(info_question):
    import time
    
    criation_response = cria_atividades_corrigida(info_question["activity_id"], info_question["user_id"])
    
    if criation_response is False:
        print(criation_response["msg"])
        return criation_response["msg"]
    
    print(f"Activity: {info_question["activity_id"]} for User: {info_question["user_id"]}")
   
    resposta = correction_llm(info_question)

    atualiza_atividades_corrigida(info_question["activity_id"], info_question["user_id"],2)
    return f"Resposta gerada com prompt: {resposta}"

def correction_llm(info_question):
    questions = fetch_question_answered(info_question["activity_id"], info_question["user_id"])
    resposta = ""
    count = 1
    
    for question in questions:
        llm = inicializar_llm()
        print(list(question.keys()))
        print(f"{question["questao_respondida"]} - {question["opcao_correta"]}")
        pergunta = f"""Respoda a questão e fale por que a questão correta é {question["opcao_correta"]}) e por que as outras alternativas estão erradas:
                        {question["questao"]}

                        A) {question["opcao_a"]}
                        B) {question["opcao_b"]}
                        C) {question["opcao_c"]}
                        D) {question["opcao_d"]}
                        E) {question["opcao_e"]}
        """
        
        print(f"PROCESSANDO PERGUNTA {count}")

        # pergunta = "Quanto é 4x4?"
        resposta = fazer_pergunta(llm, pergunta)
        # resposta = "THIS DEFAUL RESPONSE TO TEST"
        
        questaoSave = QuestaoCorrigidaRequest(
                                    correcao=resposta,
                                    modelo="gpt-4",
                                    id_cliente=info_question["user_id"],
                                    id_questao=question["id"]
                                )
        print(questaoSave)
        adicionar_questoes_corrigida(questaoSave)
        
        print(f"FINAL DO PROCESSAMENTO DA PERGUNTA {count}")
 
        # resposta = "this is DEFAULT RESPONSE FOR ECONOMIST API LLM"
        separador = "\n"+"-" * 160 + "\n\n"  # 160 hifens e uma quebra de linha
        
        with open("arqsave_response_llm.txt", "a", encoding="utf-8") as arquivo:
            
            if count!= 1:
                arquivo.write(separador)
            arquivo.write(f"{count})\n\n{resposta}\n")
        count+=1
        
    return resposta