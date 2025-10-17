import pandas as pd

df = pd.read_csv("Dados/20.csv")

df["area_conhecimento"] = df["area_conhecimento"].replace({
    "Redes": "Redes de Computadores",
    "Fundamentos Matematicos": "Fundamentos Matemáticos",
    "Analise de Algoritmos":"Análise de Algoritmos"
})

# ==============================
# 1. Taxa de acertos geral
# ==============================
acc_gpt = (df["gpt"] == df["opcao_correta"]).mean()
acc_gemini = (df["gemini"] == df["opcao_correta"]).mean()
acc_deepseek = (df["deepseek"] == df["opcao_correta"]).mean()

acc_general = pd.DataFrame({
    "Modelo": ["GPT", "Gemini", "DeepSeek"],
    "Acurácia": [f"{acc_gpt:.2f}\\%", f"{acc_gemini:.2f}\\%", f"{acc_deepseek:.2f}\\%"]
})

print("✅ DataFrame - Taxa de acertos geral:")
print(acc_general, "\n")

latex_general = acc_general.to_latex(
    index=False,
    caption="Taxa de acertos geral por modelo",
    label="tab:acuracia_geral",
    column_format="l c",
    escape=False
)
latex_general = latex_general.replace("\\begin{table}", "\\begin{table}[h]\n\\centering")

with open("acuracia_geral.txt", "w") as f:
    f.write(latex_general)


# ==============================
# 2. Taxa de acertos por ano
# ==============================
acc_by_year = df.groupby("ano").agg({
    "gpt": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean(),
    "gemini": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean(),
    "deepseek": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean()
})

acc_by_year = acc_by_year.applymap(lambda v: f"{v:.2f}\\%")

print("📆 DataFrame - Taxa de acertos por ano:")
print(acc_by_year, "\n")

latex_year = acc_by_year.to_latex(
    caption="Taxa de acertos por ano",
    label="tab:acuracia_ano",
    column_format="l c c c",
    escape=False
)
latex_year = latex_year.replace("\\begin{table}", "\\begin{table}[h]\n\\centering")

with open("acuracia_por_ano.txt", "w") as f:
    f.write(latex_year)


# ==============================
# 3. Taxa de acertos por área
# ==============================
acc_by_area = df.groupby("area_conhecimento").agg({
    "gpt": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean(),
    "gemini": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean(),
    "deepseek": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean()
})

acc_by_area = acc_by_area.applymap(lambda v: f"{v:.2f}\\%")

print("📚 DataFrame - Taxa de acertos por área de conhecimento:")
print(acc_by_area, "\n")

latex_area = acc_by_area.to_latex(
    caption="Taxa de acertos por área de conhecimento",
    label="tab:acuracia_area",
    column_format="l c c c",
    escape=False
)
latex_area = latex_area.replace("\\begin{table}", "\\begin{table}[h]\n\\centering")

with open("acuracia_por_area.txt", "w") as f:
    f.write(latex_area)
