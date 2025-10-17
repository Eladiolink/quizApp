import pandas as pd

df = pd.read_csv("Dados/02.csv")

df.rename(columns={"Redes": "Redes de Computadores"}, inplace=True)

# ==============================
# Função para calcular acurácia
# ==============================
def accuracy(series):
    return (series == series.index.get_level_values(0).map(opcao_correta)).mean()

# ==============================
# 1. Taxa de acertos geral
# ==============================
acc_gpt = (df["gpt"] == df["opcao_correta"]).mean()
acc_gemini = (df["gemini"] == df["opcao_correta"]).mean()
acc_deepseek = (df["deepseek"] == df["opcao_correta"]).mean()

print("✅ Taxa de acertos geral:")
print(f"GPT: {acc_gpt:.2%}")
print(f"Gemini: {acc_gemini:.2%}")
print(f"DeepSeek: {acc_deepseek:.2%}\n")

# ==============================
# 2. Taxa de acertos por ano
# ==============================
acc_by_year = df.groupby("ano").agg({
    "gpt": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean(),
    "gemini": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean(),
    "deepseek": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean()
})

print("📆 Taxa de acertos por ano:")
print(acc_by_year, "\n")

# ==============================
# 3. Taxa de acertos por área de conhecimento
# ==============================
acc_by_area = df.groupby("area_conhecimento").agg({
    "gpt": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean(),
    "gemini": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean(),
    "deepseek": lambda x: (x == df.loc[x.index, "opcao_correta"]).mean()
})

print("📚 Taxa de acertos por área de conhecimento:")
print(acc_by_area, "\n")
