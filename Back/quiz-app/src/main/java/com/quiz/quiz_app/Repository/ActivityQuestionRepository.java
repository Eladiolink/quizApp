package com.quiz.quiz_app.Repository;

import com.quiz.quiz_app.Entity.ActivityQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityQuestionRepository extends JpaRepository<ActivityQuestion, Integer> {
}
