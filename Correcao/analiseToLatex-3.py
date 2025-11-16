import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score

# Carregar dados
df = pd.read_csv("Dados/20.csv")

# Padronizar nomes de áreas
df["area_conhecimento"] = df["area_conhecimento"].replace({
    "Redes": "Redes de Computadores",
    "Fundamentos Matematicos": "Fundamentos Matemáticos",
    "Analise de Algoritmos": "Análise de Algoritmos"
})

modelos = ["gpt", "gemini", "deepseek"]

# Função para calcular métricas
def calcular_metricas(y_true, y_pred):
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, average="macro", zero_division=0)
    rec = recall_score(y_true, y_pred, average="macro", zero_division=0)
    return acc, prec, rec

# ==============================
# 1. Métricas gerais
# ==============================
metricas_geral = []

for modelo in modelos:
    acc, prec, rec = calcular_metricas(df["opcao_correta"], df[modelo])
    metricas_geral.append([modelo.capitalize(), f"{acc:.2f}\\%", f"{prec:.2f}\\%", f"{rec:.2f}\\%"])

df_metricas_geral = pd.DataFrame(metricas_geral, columns=["Modelo", "Acurácia", "Precisão", "Recall"])
print("✅ Métricas gerais por modelo:")
print(df_metricas_geral, "\n")

latex_geral = df_metricas_geral.to_latex(
    index=False,
    caption="Métricas gerais por modelo",
    label="tab:metricas_geral",
    column_format="l c c c",
    escape=False
)
latex_geral = latex_geral.replace("\\begin{table}", "\\begin{table}[h]\n\\centering")
with open("metricas_geral.txt", "w") as f:
    f.write(latex_geral)

# # ==============================
# # 2. Métricas por ano
# # ==============================
# metricas_por_ano = []

# for ano, group in df.groupby("ano"):
#     linha = [ano]
#     for modelo in modelos:
#         acc, prec, rec = calcular_metricas(group["opcao_correta"], group[modelo])
#         linha.extend([f"{acc:.2f}\\%", f"{prec:.2f}\\%", f"{rec:.2f}\\%"])
#     metricas_por_ano.append(linha)

# colunas = ["Ano"] + [f"{m} - {métrica}" for m in ["GPT","Gemini","DeepSeek"] for métrica in ["Acc","Prec","Rec"]]
# df_metricas_ano = pd.DataFrame(metricas_por_ano, columns=colunas)

# print("📆 Métricas por ano:")
# print(df_metricas_ano, "\n")

# latex_ano = df_metricas_ano.to_latex(
#     index=False,
#     caption="Métricas por ano",
#     label="tab:metricas_ano",
#     column_format="l" + " c"*9,
#     escape=False
# )
# latex_ano = latex_ano.replace("\\begin{table}", "\\begin{table}[h]\n\\centering")
# with open("metricas_por_ano.txt", "w") as f:
#     f.write(latex_ano)

# # ==============================
# # 3. Métricas por área
# # ==============================
# metricas_por_area = []

# for area, group in df.groupby("area_conhecimento"):
#     linha = [area]
#     for modelo in modelos:
#         acc, prec, rec = calcular_metricas(group["opcao_correta"], group[modelo])
#         linha.extend([f"{acc:.2f}\\%", f"{prec:.2f}\\%", f"{rec:.2f}\\%"])
#     metricas_por_area.append(linha)

# colunas_area = ["Área"] + [f"{m} - {métrica}" for m in ["GPT","Gemini","DeepSeek"] for métrica in ["Acc","Prec","Rec"]]
# df_metricas_area = pd.DataFrame(metricas_por_area, columns=colunas_area)

# print("📚 Métricas por área de conhecimento:")
# print(df_metricas_area, "\n")

# latex_area = df_metricas_area.to_latex(
#     index=False,
#     caption="Métricas por área de conhecimento",
#     label="tab:metricas_area",
#     column_format="l" + " c"*9,
#     escape=False
# )
# latex_area = latex_area.replace("\\begin{table}", "\\begin{table}[h]\n\\centering")
# with open("metricas_por_area.txt", "w") as f:
#     f.write(latex_area)
