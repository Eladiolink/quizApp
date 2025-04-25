package com.quiz.quiz_app.Repository;

//AnsweredQuestion

import com.quiz.quiz_app.DTO.AnsweredQuestion.AnsweredQuestionClientDTO;
import com.quiz.quiz_app.Entity.AnsweredQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnsweredQuestionRepository extends JpaRepository<AnsweredQuestion, Integer> {
    boolean existsByClientIdAndQuestionId(Integer clientId, Integer questionId);
    List<AnsweredQuestion> findAllByQuestion_Activity_Id(Integer activityId);


    @Query("""
    SELECT DISTINCT aq, q
      FROM AnsweredQuestion aq
      JOIN aq.question q
     WHERE aq.client.id = :userId
       AND q.activity.id = :activityId
    """)
    List<Object[]> findAllActivitiesNotAnsweredByClient(@Param("activityId") Integer activityId, @Param("userId") Integer userId);
}
