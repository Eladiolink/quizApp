package com.quiz.quiz_app.Repository;

import com.quiz.quiz_app.Entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
}