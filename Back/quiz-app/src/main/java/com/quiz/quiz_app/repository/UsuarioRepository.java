package com.quiz.quiz_app.repository;
import com.quiz.quiz_app.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}