package com.quiz.quiz_app.Service;

import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<User> listar() {
        return usuarioRepository.findAll();
    }

    public User salvar(User user) {
        return usuarioRepository.save(user);
    }
}
