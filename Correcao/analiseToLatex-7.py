import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# --- 1. Ler apenas o CSV específico ---
arquivo = "Dados/08.csv"
df = pd.read_csv(arquivo)

# --- 2. Padronizar nomes de áreas ---
df["area_conhecimento"] = df["area_conhecimento"].replace({
    "Redes": "Redes de Computadores",
    "Fundamentos Matematicos": "Fundamentos Matemáticos",
    "Analise de Algoritmos": "Análise de Algoritmos"
})

# --- 3. Calcular taxa de erro média por área e modelo ---
modelos = ['gpt', 'gemini', 'deepseek']

def taxa_erro_grupo(grupo):
    return pd.Series({modelo: (grupo[modelo] != grupo['opcao_correta']).mean() * 100 for modelo in modelos})

taxa_erro = df.groupby('area_conhecimento').apply(taxa_erro_grupo).round(2)

# --- 4. Heatmap para este arquivo específico ---
os.makedirs("plots", exist_ok=True)

plt.figure(figsize=(12, max(6, 0.5*len(taxa_erro))))
sns.heatmap(taxa_erro, annot=True, fmt=".2f", cmap="Reds", cbar_kws={'label':'Taxa de Erro (%)'})
plt.title(f"Taxa de Erro Média (%) por Modelo e Área\nArquivo: {os.path.basename(arquivo)}")
plt.ylabel("Área de Conhecimento")
plt.xlabel("Modelo")
plt.tight_layout()
plt.savefig("plots/heatmap_08.png")
plt.close()
print("Heatmap do arquivo '08.csv' salvo em 'plots/heatmap_08.png'")
