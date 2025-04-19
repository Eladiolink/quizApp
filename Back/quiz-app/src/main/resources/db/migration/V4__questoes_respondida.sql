CREATE TABLE questoes_respondida (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_questao INT NOT NULL,
    opcao ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES usuario(id),
    FOREIGN KEY (id_questao) REFERENCES questoes_atividade(id)
);
