package com.quiz.quiz_app.Repository;
import com.quiz.quiz_app.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}