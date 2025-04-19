package com.quiz.quiz_app.Repository;
import com.quiz.quiz_app.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<User, Integer> {
}