from celery import Celery
from app.integrations.gemini import inicializar_llm as gemini, fazer_pergunta as fg_gemini
from app.integrations.gpt import inicializar_llm as gpt, fazer_pergunta as fp_gpt
from app.integrations.deepseek import inicializar_llm as deepseek, fazer_pergunta as fp_deepseek


from app.models.chat_model import fetch_question_answered, fetch_questions_by_activity
from app.models.atividades_corrigida_model import cria_atividades_corrigida, atualiza_atividades_corrigida
from app.models.questoes_corrigida_model import adicionar_questoes_corrigida, QuestaoCorrigidaRequest


celery_app = Celery("worker", broker="redis://localhost:6379/0")

# @celery_app.task
# def processar_chamada_llms(prompt):
#     # Simula chamada demorada
#     import time
    
#     llm = inicializar_llm()

#     pergunta = "Quanto é 4x4?"
#     resposta = fazer_pergunta(llm, pergunta)
#     return f"Resposta gerada com prompt: {resposta}"

@celery_app.task
def processar_chamada_llm(info_question):
    import time
    
    criation_response = cria_atividades_corrigida(info_question["activity_id"], info_question["user_id"])
    
    if criation_response is False:
        return False
    
    print(f"Activity: {info_question["activity_id"]} for User: {info_question["user_id"]}")
   
    resposta = correction_llm(info_question)

    if resposta == False:
            return f"LLM NAO CADASTRADA"

    atualiza_atividades_corrigida(info_question["activity_id"], info_question["user_id"],2)
    return f"Resposta gerada com prompt: {resposta}"

def correction_llm(info_question):
    questions = fetch_questions_by_activity(info_question["activity_id"])
    resposta = ""
    count = 1
    
    for question in questions:
        print(info_question["model"])
        if info_question["model"] == "gemini":
            llm = gemini()
            fazer_pergunta = fg_gemini
        elif info_question["model"] == "gpt-4":
            llm = gpt()
            fazer_pergunta = fp_gpt
        elif info_question["model"] == "deepseek":
            llm = deepseek()
            fazer_pergunta = fp_deepseek
        else:
            print(f"LLM nao cadastrada")
            return False

        print(list(question.keys()))
        pergunta = f"""Responda a questão abaixo. Sua resposta deve seguir EXATAMENTE o formato a seguir, sem usar negrito, hashtags, parênteses ou markdown.
                    
                        Formato obrigatório:

                        A alternativa correta é a letra X.

                        Explicação: [sua explicação aqui, dizendo por que essa está certa e as outras estão erradas]

                        Questão:
                        {question["questao"]}

                        A) {question["opcao_a"]}
                        B) {question["opcao_b"]}
                        C) {question["opcao_c"]}
                        D) {question["opcao_d"]}
                        E) {question["opcao_e"]}"""
        
        print(f"PROCESSANDO PERGUNTA {count}")

        # pergunta = "Quanto é 4x4?"
        resposta = fazer_pergunta(llm, pergunta)
        # resposta = "THIS DEFAUL RESPONSE TO TEST"
        
        questaoSave = QuestaoCorrigidaRequest(
                                    correcao=resposta,
                                    modelo=info_question["model"],
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