import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain_core.messages import HumanMessage

load_dotenv()

def texto_para_markdown(texto_raw):
    # No ChatGPT o conteúdo geralmente já vem limpo, mas pode-se ajustar quebras de linha ou outros símbolos.
    texto_formatado = texto_raw.replace("\\n", "\n").replace("\\'", "'")
    return texto_formatado

def inicializar_llm(model="gpt-4.1-2025-04-14", temperature=0.8):
    openai_api_key = os.getenv("OPENAI_API_KEY")

    if not openai_api_key:
        raise ValueError("A chave da API da OpenAI não foi fornecida nem encontrada no arquivo .env.")

    # Inicializar o modelo da OpenAI
    llm = ChatOpenAI(
        model=model,
        temperature=temperature,
        openai_api_key=openai_api_key
    )
    return llm

def fazer_pergunta(llm, pergunta):
    messages = [HumanMessage(content=pergunta)]
    resposta = llm.invoke(messages)

    # No ChatOpenAI, os metadados de uso também podem estar disponíveis via resposta.response_metadata
    # print("QUANTIDADE TOTAL DE TOKENS: ", resposta.response_metadata.get('total_tokens', 'N/A'))

    res_formatada = texto_para_markdown(resposta.content)
    return res_formatada

def listar_modelos_openai():
    import openai
    openai.api_key = os.getenv("OPENAI_API_KEY")

    print("Modelos OpenAI disponíveis:")
    try:
        models = openai.models.list()
        for model in models['data']:
            print(f"- {model['id']}")
    except Exception as e:
        print("Erro ao listar modelos:", str(e))
