CREATE TABLE questoesAtividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questao TEXT NOT NULL,
    A TEXT NOT NULL,
    B TEXT NOT NULL,
    C TEXT NOT NULL,
    D TEXT NOT NULL,
    E TEXT NOT NULL,
    opcaoCorreta ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
    imagem TEXT,
    idAtividade INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idAtividade) REFERENCES atividade(id)
);