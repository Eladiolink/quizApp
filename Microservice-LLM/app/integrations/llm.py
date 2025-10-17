import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

def texto_para_markdown(texto_raw):
    texto_formatado = texto_raw.replace("\\n", "\n").replace("\\'", "'")
    return texto_formatado

def inicializar_llm(model="deepseek/deepseek-r1:free", temperature=0.8):
    openai_api_key = os.getenv("DEEPSEEK_API_KEY")
    
    if not openai_api_key:
        raise ValueError("A chave da API não foi fornecida nem encontrada no arquivo .env.")

    if "TEMPERATURE" in os.environ:
        temperature = os.getenv("TEMPERATURE")
        print("TEMPERATURE está definida!")
    # Inicializar modelo LLM
    llm = ChatOpenAI(
        model=model,
        temperature=temperature,
        streaming=True,
        openai_api_key=openai_api_key,
        base_url="https://openrouter.ai/api/v1",
    )
    return llm

def fazer_pergunta(llm, pergunta):
    prompt = f"{pergunta}"
    resposta = llm.invoke(prompt)
    print("QUANTIDADE TOTAL DE TOKENS: ",resposta.usage_metadata['total_tokens'])
    res_formatada = texto_para_markdown(resposta.content)
    return res_formatada
