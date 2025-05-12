from langchain_community.chat_models import ChatOllama  # Importa o ChatOllama
from langchain_core.messages import AIMessage, HumanMessage

def texto_para_markdown(texto_raw):
    texto_formatado = texto_raw.replace("\\n", "\n").replace("\\'", "'")
    return texto_formatado

def inicializar_llm(model="llama3", temperature=0.8):
    # Inicializa o modelo do Ollama local
    llm = ChatOllama(
        model=model,
        temperature=temperature
    )
    return llm

def fazer_pergunta(llm, pergunta):
    # Usa LangChain-style messages (obrigatório para ChatOllama)
    resposta = llm.invoke([HumanMessage(content=pergunta)])
    res_formatada = texto_para_markdown(resposta.content)
    return res_formatada
