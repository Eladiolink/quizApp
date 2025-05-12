package com.quiz.quiz_app.Repository;

import com.quiz.quiz_app.DTO.CorrectedQuestion.CorrectedQuestionDTO;
import com.quiz.quiz_app.Entity.CorrectedQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CorrectedQuestionRepository extends JpaRepository<CorrectedQuestion, Integer> {
    @Query("""
        SELECT new com.quiz.quiz_app.DTO.CorrectedQuestion.CorrectedQuestionDTO(cq) 
          FROM CorrectedQuestion cq
         WHERE cq.client.id = :userId
           AND cq.question.activity.id = :activityId
           AND EXISTS (
                       SELECT 1
                         FROM CorrectedActivity ca
                        WHERE ca.activity.id = cq.question.activity.id
                          AND ca.client.id = cq.client.id
                          AND ca.status.id = 2
                       )
    """)
    List<CorrectedQuestionDTO> findByUserIdAndActivityId(
            @Param("activityId") Integer activityId,
            @Param("userId") Integer userId
    );

}
