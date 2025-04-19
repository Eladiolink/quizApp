package com.quiz.quiz_app.Repository;

//AnsweredQuestion

import com.quiz.quiz_app.Entity.AnsweredQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnsweredQuestionRepository extends JpaRepository<AnsweredQuestion, Integer> {
}
