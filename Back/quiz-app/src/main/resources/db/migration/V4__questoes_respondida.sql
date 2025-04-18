CREATE TABLE questoesRespondida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    idQuestao INT NOT NULL,
    opcao ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idCliente) REFERENCES usuario(id),
    FOREIGN KEY (idQuestao) REFERENCES questoesAtividade(id)
);
