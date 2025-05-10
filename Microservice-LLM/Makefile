# Define a variável de ambiente para o ambiente virtual
VENV := .venv

# Comando para rodar o servidor com o uvicorn
run:
	@echo "Iniciando o servidor com uvicorn..."
	uvicorn app.main:app --reload

# Criar ambiente virtual
venv:
	@echo "Criando ambiente virtual..."
	python3 -m venv $(VENV)

# Ativar ambiente virtual
activate:
	@echo "Ativando o ambiente virtual..."
	source $(VENV)/bin/activate

# Instalar as dependências
install:
	@echo "Instalando dependências..."
	pip install -r requirements.txt

# Rodar ambiente virtual e o servidor com o uvicorn
serve: venv activate install run
