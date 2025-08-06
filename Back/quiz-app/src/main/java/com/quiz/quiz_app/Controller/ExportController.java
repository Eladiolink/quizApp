package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.Entity.Activity;
import com.quiz.quiz_app.Entity.ActivityQuestion;
import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Repository.ActivityQuestionRepository;
import com.quiz.quiz_app.Repository.ActivityRepository;
import com.quiz.quiz_app.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/export")
public class ExportController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ActivityQuestionRepository activityQuestionRepository;

    @GetMapping(value = "/activities-sql", produces = "text/sql")
    public ResponseEntity<String> exportActivitiesAndQuestionsAsSql() {
        List<Activity> activities = activityRepository.findAll();
        List<ActivityQuestion> questions = activityQuestionRepository.findAll();

        StringBuilder sqlBuilder = new StringBuilder();

        int counter = 1;
        Map<Integer, String> activityIdToSqlVar = new HashMap<>();

        // Exporta atividades
        for (Activity activity : activities) {
            sqlBuilder.append(String.format(
                    "INSERT INTO atividade (titulo, descricao, criado_por, created_at, ano) " +
                            "VALUES ('%s', '%s', %s, '%s', %d);\n",
                    escapeSql(activity.getTitle()),
                    escapeSql(activity.getDescription()),
                    "NULL", // Ajuste se necessário
                    activity.getCreatedAt(),
                    activity.getActivityYear()
            ));

            String sqlVar = "@atividade_id_" + counter;
            sqlBuilder.append("SET " + sqlVar + " = LAST_INSERT_ID();\n\n");

            // Exporta questões
            for (ActivityQuestion question : questions) {

                if(activity.getId() != question.getActivity().getId()) continue;
               // sqlVar = activityIdToSqlVar.get(question.getActivity().getId());

                sqlBuilder.append(String.format(
                        "INSERT INTO questoes_atividade (questao, opcao_a, opcao_b, opcao_c, opcao_d, opcao_e, opcao_correta, imagem, id_atividade, created_at, area_conhecimento, numero_questao) " +
                                "VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', %s, %s, '%s', '%s', %d);\n",
                        escapeSql(question.getQuestion()),
                        escapeSql(question.getOptionA()),
                        escapeSql(question.getOptionB()),
                        escapeSql(question.getOptionC()),
                        escapeSql(question.getOptionD()),
                        escapeSql(question.getOptionE()),
                        escapeSql(question.getCorrectOption().name()),
                        question.getImage() != null ? "'" + escapeSql(question.getImage()) + "'" : "NULL",
                        sqlVar,
                        question.getCreatedAt(),
                        escapeSql(question.getKnowledgeArea()),
                        question.getQuestionNumber()
                ));
            }
            counter++;
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=atividade_export.sql")
                .body(sqlBuilder.toString());
    }

    @GetMapping(value = "/sql", produces = "text/sql")
    public ResponseEntity<String> exportUsersAsSql() {
        List<User> users = userRepository.findAll();

        StringBuilder sqlBuilder = new StringBuilder();

        for (User user : users) {
            sqlBuilder.append(String.format(
                    "INSERT INTO user (id, name, email, password, type) VALUES (%d, '%s', '%s', '%s', '%s');\n",
                    user.getId(),
                    escapeSql(user.getName()),
                    escapeSql(user.getEmail()),
                    escapeSql(user.getPassword()),
                    user.getType().name()
            ));
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users.sql")
                .body(sqlBuilder.toString());
    }

    private String escapeSql(String input) {
        if (input == null) return "";
        return input
                .replace("\\", "\\\\")     // barra invertida
                .replace("'", "''")        // aspas simples
                .replace("\n", "\\n")      // nova linha
                .replace("\r", "\\r")      // retorno de carro
                .replace("\t", "\\t");     // tabulação
    }
}
