from db import connect_database
import pandas as pd
import re

def init_dataframe():
    conn = connect_database()

    if conn:
        cursor = conn.cursor()
        cursor.execute("""SELECT qa.id,a.ano
                            , numero_questao
                            , area_conhecimento
                            , opcao_correta 
                            FROM questoes_atividade qa 
                            JOIN atividade a 
                            ON qa.id_atividade = a.id""")
        rows = cursor.fetchall()
        # Pega o nome das colunas
        columns = [desc[0] for desc in cursor.description]

        # Cria o DataFrame
        df = pd.DataFrame(rows, columns=columns)

        cursor.close()
        conn.close()

        df["gpt"] = None
        df["gemini"] = None 
        df["deepseek"] = None 

        return df

def extrair_letra(frase: str) -> str | None:
    match = re.search(r"letra\s+([A-E])\.", frase, re.IGNORECASE)
    if match:
        return match.group(1).upper()
    return None

def get_models_response(df,model):
    conn = connect_database()

    if conn:
        for index, row in df.iterrows():
            if "gpt" in model:
                model='gpt-4'
            #print(f"ID={row['id']}, ano={row['ano']}, Opcao Correta={row['opcao_correta']}")
            cursor = conn.cursor()
            cursor.execute("""SELECT correcao 
                                FROM questoes_corrigida 
                            WHERE id_questao = %s 
                                AND modelo = %s""",(row['id'], model))
            
            result = cursor.fetchall()
            
            if "gpt" in model:
                model='gpt'
            
            for correcao in result:
                letra = extrair_letra(correcao[0])

                if letra is not None or letra != 'X':
                    df.at[index, model] = letra
            cursor.close()
        conn.close()
    return df
# Exemplo de uso
if __name__ == "__main__":
    
    df = init_dataframe()
    df = get_models_response(df,'gpt-4')
    df = get_models_response(df,'gemini')
    df = get_models_response(df,'deepseek')

    print(df)
    df.to_csv("dados.csv", index=False) 