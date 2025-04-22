package com.quiz.quiz_app.Controller;
import com.quiz.quiz_app.DTO.User.UserRequestCreateDTO;
import com.quiz.quiz_app.DTO.User.UserResponseDTO;
import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserResponseDTO> listar() {
        var res = userService.listar();
        return res;
    }

    @PostMapping("create")
    public ResponseEntity salvar(@RequestBody UserRequestCreateDTO user) {
        return userService.salvar(user);
    }
}
