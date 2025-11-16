
import pandas as pd
import os
import matplotlib.pyplot as plt

# --- 1. Carregar todos os CSVs da pasta ---
folder = "Dados"
dfs = []

for file in os.listdir(folder):
    if file.endswith(".csv"):
        temp = float(file.replace(".csv", "")) / 10
        df = pd.read_csv(os.path.join(folder, file))
        df["temperatura"] = temp
        dfs.append(df)

df_total = pd.concat(dfs, ignore_index=True)

# --- 2. Padronizar nomes de áreas ---
df_total["area_conhecimento"] = df_total["area_conhecimento"].replace({
    "Redes": "Redes de Computadores",
    "Fundamentos Matematicos": "Fundamentos Matemáticos",
    "Analise de Algoritmos": "Análise de Algoritmos"
})

# --- 3. Cálculo de acertos por modelo ---
df_total["gpt_acertou"] = (df_total["gpt"] == df_total["opcao_correta"]).astype(int)
df_total["gemini_acertou"] = (df_total["gemini"] == df_total["opcao_correta"]).astype(int)
df_total["deepseek_acertou"] = (df_total["deepseek"] == df_total["opcao_correta"]).astype(int)

# --- 4. Acurácia média por área e temperatura ---
resultado = df_total.groupby(["temperatura", "area_conhecimento"])[
    ["gpt_acertou", "gemini_acertou", "deepseek_acertou"]
].mean().reset_index()

print("Resultado calculado com sucesso ✅")

# --- 5. Gráfico de linhas por modelo ---
models = ["gpt_acertou", "gemini_acertou", "deepseek_acertou"]

for model in models:
    plt.figure(figsize=(10,5))
    for area in resultado["area_conhecimento"].unique():
        data = resultado[resultado["area_conhecimento"] == area]
        plt.plot(data["temperatura"], data[model], marker="o", label=area)

    plt.title(f"Variação da Acurácia por Temperatura - {model.replace('_acertou','').upper()}")
    plt.xlabel("Temperatura")
    plt.ylabel("Acurácia Média")
    plt.legend(title="Área de Conhecimento")
    plt.grid(True)
    plt.show()

import os

# Criar pasta para salvar as imagens
os.makedirs("Resultados", exist_ok=True)

models = ["gpt_acertou", "gemini_acertou", "deepseek_acertou"]

for model in models:
    plt.figure(figsize=(10,5))
    for area in resultado["area_conhecimento"].unique():
        data = resultado[resultado["area_conhecimento"] == area]
        plt.plot(data["temperatura"], data[model], marker="o", label=area)

    nome_modelo = model.replace("_acertou","").upper()
    plt.title(f"Variação da Acurácia por Temperatura - {nome_modelo}")
    plt.xlabel("Temperatura")
    plt.ylabel("Acurácia Média")
    plt.legend(title="Área de Conhecimento")
    plt.grid(True)

    # --- Salvar em PNG ---
    caminho = f"Resultados/variacao_temperatura_{nome_modelo}.png"
    plt.savefig(caminho, dpi=300, bbox_inches="tight")
    print(f"✅ Imagem salva em: {caminho}")

    plt.close()  # fechar figura para economizar memória
