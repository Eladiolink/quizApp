package com.quiz.quiz_app.Repository;

import com.quiz.quiz_app.DTO.Activity.ActivityWithStatus;
import com.quiz.quiz_app.Entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
//    @Query("""
//    SELECT DISTINCT new com.quiz.quiz_app.DTO.Activity.ActivityWithStatus(
//        aq.activity,
//        (
//            SELECT ca.status.statusDesc
//              FROM CorrectedActivity ca
//             WHERE ca.activity.id = aq.activity.id
//               AND ca.client.id = :clientId
//        )
//    )
//    FROM AnsweredQuestion ans
//    JOIN ans.question aq
//    WHERE ans.client.id = :clientId
//    """)
@Query("""
SELECT DISTINCT new com.quiz.quiz_app.DTO.Activity.ActivityWithStatus(
    a,
    ca.status.statusDesc
)
FROM Activity a
LEFT JOIN CorrectedActivity ca ON ca.activity.id = a.id
""")

List<ActivityWithStatus> findAllByClientAnswered(@Param("clientId") Integer clientId);

    @Query("""
    SELECT DISTINCT a
      FROM Activity a
    """)
    List<Activity> findAllActivitiesNotAnsweredByClient(@Param("clientId") Integer clientId);

}