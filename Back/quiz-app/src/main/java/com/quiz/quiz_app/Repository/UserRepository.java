package com.quiz.quiz_app.Repository;
import com.quiz.quiz_app.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Integer> {
    UserDetails findByEmail(String email);
    User findUserByEmail(String email);
}