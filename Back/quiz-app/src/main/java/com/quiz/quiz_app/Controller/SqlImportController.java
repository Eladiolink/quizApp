package com.quiz.quiz_app.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/import")
public class SqlImportController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/execute-sql")
    public String importSql(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "Arquivo .sql não enviado!";
        }

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {

            StringBuilder statement = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                // Ignora comentários e linhas vazias
                line = line.trim();
                if (line.isEmpty() || line.startsWith("--") || line.startsWith("//") || line.startsWith("/*")) {
                    continue;
                }

                statement.append(line);
                // Executa ao encontrar o ponto e vírgula de término
                if (line.endsWith(";")) {
                    String sql = statement.toString();
                    jdbcTemplate.execute(sql);
                    statement.setLength(0);
                }
            }

            return "Arquivo .sql executado com sucesso!";

        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao executar o SQL: " + e.getMessage();
        }
    }
}
