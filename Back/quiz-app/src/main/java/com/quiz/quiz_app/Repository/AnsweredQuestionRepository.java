package com.quiz.quiz_app.Repository;

//AnsweredQuestion

import com.quiz.quiz_app.Entity.AnsweredQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnsweredQuestionRepository extends JpaRepository<AnsweredQuestion, Integer> {
    boolean existsByClientIdAndQuestionId(Integer clientId, Integer questionId);
    List<AnsweredQuestion> findAllByQuestion_Activity_Id(Integer activityId);
}
