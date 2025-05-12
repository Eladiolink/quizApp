package com.quiz.quiz_app.Repository;

import com.quiz.quiz_app.DTO.Activity.ActivityWithStatus;
import com.quiz.quiz_app.Entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    @Query("""
    SELECT DISTINCT new com.quiz.quiz_app.DTO.Activity.ActivityWithStatus(
        aq.activity,
        (
            SELECT ca.status.statusDesc
              FROM CorrectedActivity ca
             WHERE ca.activity.id = aq.activity.id
               AND ca.client.id = :clientId
        )
    )
    FROM AnsweredQuestion ans
    JOIN ans.question aq
    WHERE ans.client.id = :clientId
    """)
    List<ActivityWithStatus> findAllByClientAnswered(@Param("clientId") Integer clientId);

    @Query("""
    SELECT DISTINCT a
      FROM Activity a
     WHERE a.id NOT IN (
                        SELECT DISTINCT aq.activity.id
                          FROM AnsweredQuestion ans
                          JOIN ans.question aq
                         WHERE ans.client.id = :clientId
    )
    """)
    List<Activity> findAllActivitiesNotAnsweredByClient(@Param("clientId") Integer clientId);

}