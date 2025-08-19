import os
from dotenv import load_dotenv
from openai import OpenAI
from langchain_core.messages import HumanMessage
from langchain_community.chat_models import ChatOpenAI

load_dotenv()

def texto_para_markdown(texto_raw):
    texto_formatado = texto_raw.replace("\\n", "\n").replace("\\'", "'")
    return texto_formatado

def inicializar_llm(model="deepseek-chat", temperature=0.8):
    deepseek_api_key = os.getenv("DEEPSEEK_API_KEY")

    if not deepseek_api_key:
        raise ValueError("A chave da API da DeepSeek não foi fornecida nem encontrada no arquivo .env.")

    # Inicializa o cliente OpenAI apontando para o endpoint da DeepSeek
    client = OpenAI(
        api_key=deepseek_api_key,
        base_url="https://api.deepseek.com/v1"  # ou o endpoint correto caso seja outro
    )

    return client

def fazer_pergunta(client, pergunta):
    temperature = 0.8
    model = "deepseek-chat"
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": pergunta}],
            temperature=temperature
        )

        resposta = response.choices[0].message.content
        return texto_para_markdown(resposta)

    except Exception as e:
        return f"Erro ao consultar o modelo DeepSeek: {str(e)}"

def listar_modelos_deepseek(client):
    print("Modelos DeepSeek disponíveis:")
    try:
        models = client.models.list()
        for model in models.data:
            print(f"- {model.id}")
    except Exception as e:
        print("Erro ao listar modelos:", str(e))
