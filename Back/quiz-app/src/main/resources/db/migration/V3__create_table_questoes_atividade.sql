CREATE TABLE questoesAtividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questao TEXT NOT NULL,
    A TEXT NOT NULL,
    B TEXT NOT NULL,
    C TEXT NOT NULL,
    D TEXT NOT NULL,
    E TEXT NOT NULL,
    opcao_correta ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
    imagem TEXT,
    id_atividade INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_atividade) REFERENCES atividade(id)
);