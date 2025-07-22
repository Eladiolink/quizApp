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

import java.util.List;

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

        // Exporta atividades
        for (Activity activity : activities) {
            sqlBuilder.append(String.format(
                    "INSERT INTO atividade (id, titulo, descricao, criado_por, created_at) VALUES (%d, '%s', '%s', %s, '%s');\n",
                    activity.getId(),
                    escapeSql(activity.getTitle()),
                    escapeSql(activity.getDescription()),
                    "NULL",
                    activity.getCreatedAt()
            ));
        }

        sqlBuilder.append("\n");

        // Exporta questões
        for (ActivityQuestion question : questions) {
            sqlBuilder.append(String.format(
                    "INSERT INTO questoesAtividade (id, questao, opcao_a, opcao_b, opcao_c, opcao_d, opcao_e, opcao_correta, imagem, id_atividade, created_at) " +
                            "VALUES (%d, '%s', '%s', '%s', '%s', '%s', '%s', '%s', %s, %d, '%s');\n",
                    question.getId(),
                    escapeSql(question.getQuestion()),
                    escapeSql(question.getOptionA()),
                    escapeSql(question.getOptionB()),
                    escapeSql(question.getOptionC()),
                    escapeSql(question.getOptionD()),
                    escapeSql(question.getOptionE()),
                    question.getCorrectOption().name(),
                    question.getImage() != null ? "'" + escapeSql(question.getImage()) + "'" : "NULL",
                    question.getActivity().getId(),
                    question.getCreatedAt()
            ));
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
        return input == null ? "" : input.replace("'", "''");
    }
}
