import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

load_dotenv()

def texto_para_markdown(texto_raw):
    # O Gemini geralmente retorna conteúdo já bem formatado, mas esta função pode ser útil para ajustes.
    texto_formatado = texto_raw.replace("\\n", "\n").replace("\\'", "'")
    return texto_formatado

def inicializar_llm(model="gemini-2.0-flash", temperature=0.8):
    google_api_key = os.getenv("GOOGLE_API_KEY") # Altere para GOOGLE_API_KEY

    if not google_api_key:
        raise ValueError("A chave da API do Google não foi fornecida nem encontrada no arquivo .env.")

    # Inicializar modelo LLM
    llm = ChatGoogleGenerativeAI(
        model=model,
        temperature=temperature,
        # streaming=True, # O streaming é geralmente habilitado por padrão ou configurado de outra forma no Gemini
        google_api_key=google_api_key,
    )
    return llm

def fazer_pergunta(llm, pergunta):
    # Para o Gemini, é uma boa prática passar a pergunta como uma lista de mensagens
    messages = [HumanMessage(content=pergunta)]
    resposta = llm.invoke(messages)

    # Acessando o usage_metadata para tokens no Gemini pode variar um pouco,
    # dependendo da versão da biblioteca. Verifique a documentação para o acesso exato.
    # Por enquanto, vamos assumir que pode estar disponível ou ser acessado de forma similar.
    # print("QUANTIDADE TOTAL DE TOKENS: ", resposta.usage_metadata.get('total_tokens', 'N/A'))

    res_formatada = texto_para_markdown(resposta.content)
    return res_formatada

def listar_modelos_gemini():
    google_api_key = os.getenv("GOOGLE_API_KEY")
    if not google_api_key:
        raise ValueError("A chave da API do Google não foi fornecida nem encontrada no arquivo .env.")

    genai.configure(api_key=google_api_key)

    print("Modelos Gemini disponíveis:")
    for m in genai.list_models():
        # Verifica se o modelo suporta a geração de conteúdo de texto
        if "generateContent" in m.supported_generation_methods:
            print(f"- {m.name} (suporta generateContent)")
        else:
            print(f"- {m.name} (NÃO suporta generateContent)")