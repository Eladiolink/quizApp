import pandas as pd
import itertools

# ==============================
# 0. Carregamento e limpeza
# ==============================
df = pd.read_csv("Dados/20.csv")

df["area_conhecimento"] = df["area_conhecimento"].replace({
    "Redes": "Redes de Computadores",
    "Fundamentos Matematicos": "Fundamentos Matemáticos",
    "Analise de Algoritmos": "Análise de Algoritmos"
})

modelos = ["gpt", "gemini", "deepseek"]

# ==============================
# 1. Correlação de concordância (iguais)
# ==============================
pares = list(itertools.combinations(modelos, 2))
dados_concordancia = []

for m1, m2 in pares:
    concordancia = (df[m1] == df[m2]).mean() * 100
    dados_concordancia.append({
        "Par": f"{m1.upper()} x {m2.upper()}",
        "Concordância (%)": round(concordancia, 2)
    })

concord_df = pd.DataFrame(dados_concordancia)
print("🤝 Concordância direta entre modelos (% de respostas iguais):")
print(concord_df, "\n")

# ==============================
# 2. Correlação estatística (Pearson)
# ==============================
# Mapeia A–E para 1–5 para permitir cálculo de correlação
mapa = {"A": 1, "B": 2, "C": 3, "D": 4, "E": 5}
df_numerico = df[modelos].replace(mapa)

corr_matrix = df_numerico.corr(method="pearson").round(3)
print("📈 Correlação estatística entre modelos (Pearson):")
print(corr_matrix, "\n")

# ==============================
# 3. Exportar para LaTeX (opcional)
# ==============================
latex_corr = corr_matrix.to_latex(
    caption="Correlação estatística (Pearson) entre modelos",
    label="tab:correlacao_modelos",
    column_format="lccc"
)
with open("correlacao_modelos.txt", "w") as f:
    f.write(latex_corr)
