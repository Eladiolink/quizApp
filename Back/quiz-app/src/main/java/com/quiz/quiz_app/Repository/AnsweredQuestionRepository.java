package com.quiz.quiz_app.Repository;

//AnsweredQuestion

import com.quiz.quiz_app.Entity.AnsweredQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnsweredQuestionRepository extends JpaRepository<AnsweredQuestion, Integer> {
    boolean existsByClientIdAndQuestionId(Integer clientId, Integer questionId);
    List<AnsweredQuestion> findAllByQuestion_Activity_Id(Integer activityId);

    @Query("""
                SELECT q.id,
                       q.question,
                       q.optionA,
                       q.optionB,
                       q.optionC,
                       q.optionD,
                       q.optionE,
                       q.correctOption,
                       q.image,
                       q.knowledgeArea
                FROM ActivityQuestion q
                WHERE q.activity.id = :activityId
    """)
    List<Object[]> findAllActivitiesNotAnsweredByClient(@Param("activityId") Integer activityId, @Param("userId") Integer userId);
}
