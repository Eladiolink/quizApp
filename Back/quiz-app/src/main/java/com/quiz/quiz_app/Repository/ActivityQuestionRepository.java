package com.quiz.quiz_app.Repository;

import com.quiz.quiz_app.Entity.ActivityQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityQuestionRepository extends JpaRepository<ActivityQuestion, Integer> {
    List<ActivityQuestion> findByActivityId(Integer activityId);
}
