import pandas as pd
import glob
import matplotlib.pyplot as plt
import seaborn as sns
import os

# --- 1. Ler e consolidar CSVs ---
arquivos = glob.glob("Dados/*.csv")
dfs = []

for arq in arquivos:
    temp = pd.read_csv(arq)
    dfs.append(temp)

df_total = pd.concat(dfs, ignore_index=True)

# --- 2. Padronizar nomes de áreas ---
df_total["area_conhecimento"] = df_total["area_conhecimento"].replace({
    "Redes": "Redes de Computadores",
    "Fundamentos Matematicos": "Fundamentos Matemáticos",
    "Analise de Algoritmos": "Análise de Algoritmos"
})

# --- 3. Calcular taxa de erro média por área e modelo (agrupando todas as bases) ---
modelos = ['gpt', 'gemini', 'deepseek']

def taxa_erro_grupo(grupo):
    return pd.Series({modelo: (grupo[modelo] != grupo['opcao_correta']).mean() * 100 for modelo in modelos})

taxa_erro = df_total.groupby('area_conhecimento').apply(taxa_erro_grupo).round(2)

# --- 4. Exportar tabela LaTeX ---
latex_tabela = taxa_erro.reset_index().to_latex(index=False,
                                               caption="Taxa de Erro Média (%) por Área de Conhecimento e Modelo",
                                               label="tab:taxa_erro_media",
                                               float_format="%.2f")
with open("taxa_erro_media.tex", "w") as f:
    f.write(latex_tabela)

print("Tabela LaTeX gerada em 'taxa_erro_media.tex'")

# --- 5. Heatmap consolidado ---
os.makedirs("plots", exist_ok=True)

plt.figure(figsize=(12, max(6, 0.5*len(taxa_erro))))
sns.heatmap(taxa_erro, annot=True, fmt=".2f", cmap="Reds", cbar_kws={'label':'Taxa de Erro (%)'})
plt.title("Taxa de Erro Média (%) por Modelo e Área")
plt.ylabel("Área de Conhecimento")
plt.xlabel("Modelo")
plt.tight_layout()
plt.savefig("plots/heatmap_consolidado.png")
plt.close()
print("Heatmap consolidado salvo em 'plots/heatmap_consolidado.png'")

# --- 6. Scatter plot / Line plot consolidado ---
taxa_erro_long = taxa_erro.reset_index().melt(id_vars=['area_conhecimento'],
                                              value_vars=modelos,
                                              var_name='Modelo',
                                              value_name='Taxa de Erro (%)')

# Scatter plot
plt.figure(figsize=(14,6))
sns.scatterplot(data=taxa_erro_long, x='area_conhecimento', y='Taxa de Erro (%)',
                hue='Modelo', s=100)
plt.xticks(rotation=45, ha='right')
plt.title("Taxa de Erro Média (%) por Modelo e Área (Scatter)")
plt.ylabel("Taxa de Erro (%)")
plt.xlabel("Área de Conhecimento")
plt.legend(title='Modelo')
plt.tight_layout()
plt.savefig("plots/scatter_taxa_erro_media.png")
plt.close()
print("Scatter plot salvo em 'plots/scatter_taxa_erro_media.png'")

# Line plot
plt.figure(figsize=(14,6))
sns.lineplot(data=taxa_erro_long, x='area_conhecimento', y='Taxa de Erro (%)',
             hue='Modelo', marker='o')
plt.xticks(rotation=45, ha='right')
plt.title("Taxa de Erro Média (%) por Modelo e Área (Line Plot)")
plt.ylabel("Taxa de Erro (%)")
plt.xlabel("Área de Conhecimento")
plt.legend(title='Modelo')
plt.tight_layout()
plt.savefig("plots/line_taxa_erro_media.png")
plt.close()
print("Line plot salvo em 'plots/line_taxa_erro_media.png'")
