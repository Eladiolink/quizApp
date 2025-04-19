package com.quiz.quiz_app.Controller;
import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<User> listar() {
        return usuarioService.listar();
    }

    @PostMapping("create")
    public User salvar(@RequestBody User user) {
        return usuarioService.salvar(user);
    }
}
