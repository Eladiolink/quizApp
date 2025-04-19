CREATE TABLE questoes_atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questao TEXT NOT NULL,
    opcao_a TEXT NOT NULL,
    opcao_b TEXT NOT NULL,
    opcao_c TEXT NOT NULL,
    opcao_d TEXT NOT NULL,
    opcao_e TEXT NOT NULL,
    opcao_correta ENUM('A', 'B', 'C', 'D', 'E') NOT NULL,
    imagem TEXT,
    id_atividade INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_atividade) REFERENCES atividade(id)
);