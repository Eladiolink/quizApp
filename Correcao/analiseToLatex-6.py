import pandas as pd
import os
import matplotlib.pyplot as plt
import numpy as np

# --- 1. Ler todos os CSVs da pasta Dados ---
folder = "Dados"
dfs = []

for file in os.listdir(folder):
    if file.endswith(".csv"):
        temp = float(file.replace(".csv", "")) / 10  # 05.csv -> 0.5
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

# Filtrar APENAS as temperaturas desejadas
temps_validas = [0.0, 0.4, 0.8, 1.2, 1.6, 2.0]
resultado = resultado[resultado["temperatura"].isin(temps_validas)]

print("✅ Tabela resultado filtrada e calculada com sucesso")

# --- 5. Gerar Heatmaps e salvar em PNG ---
os.makedirs("Resultados", exist_ok=True)

models = {
    "gpt_acertou": "GPT",
    "gemini_acertou": "Gemini",
    "deepseek_acertou": "DeepSeek"
}

for col, label in models.items():
    tabela = resultado.pivot(index="area_conhecimento", 
                             columns="temperatura", 
                             values=col).sort_index()

    mat = tabela.values

    plt.figure(figsize=(12, 8))

    # Colormap idêntico ao da imagem (vermelho sequencial)
    im = plt.imshow(mat, aspect='auto', interpolation='nearest', cmap='Reds')

    # Barra de cores
    cbar = plt.colorbar(im, label="Acurácia Média (%)")

    # Títulos
    plt.title(f"Heatmap de Acurácia por Temperatura - {label}", fontsize=14)
    plt.xlabel("Temperatura")
    plt.ylabel("Área de Conhecimento")

    # Eixos
    plt.xticks(ticks=np.arange(len(tabela.columns)), labels=tabela.columns)
    plt.yticks(ticks=np.arange(len(tabela.index)), labels=tabela.index)
    

    # # Inserir valores dentro das células
    # for i in range(mat.shape[0]):
    #     for j in range(mat.shape[1]):
    #         valor = mat[i, j]
    #         plt.text(j, i, f"{valor*100:.2f}", ha="center", va="center", fontsize=9, color="black")
    # Inserir valores dentro das células com cor dinâmica
    for i in range(mat.shape[0]):
        for j in range(mat.shape[1]):
            valor = mat[i, j]

            # Cor dinâmica: se a célula for escura → texto branco
            color = "white" if valor > tabela.max().max() * 0.6 else "black"

            plt.text(j, i, f"{valor*100:.2f}", 
                    ha="center", va="center", 
                    fontsize=9, color=color)

    # Salvar PNG
    caminho = f"Resultados/heatmap_{label}.png"
    plt.savefig(caminho, dpi=300, bbox_inches="tight")
    plt.close()
    print(f"🔥 Heatmap salvo: {caminho}")
