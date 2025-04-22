package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.Configuration.TokenService;
import com.quiz.quiz_app.DTO.Authentication.AuthenticationDTO;
import com.quiz.quiz_app.DTO.Authentication.LoginResponseDTO;
import com.quiz.quiz_app.DTO.User.UserRequestCreateDTO;
import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Repository.UserRepository;
import com.quiz.quiz_app.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Validated AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);

//        var token = tokenService.generateToken(data.email());
        UserDetails user = (UserDetails) auth.getPrincipal();
        var token = tokenService.generateToken(user.getUsername());
        User userE = userRepository.findUserByEmail(user.getUsername());
        return ResponseEntity.ok(new LoginResponseDTO(token, userE.getType(), userE.getId(), userE.getName()));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Validated UserRequestCreateDTO data){
        return userService.salvar(data);
    }
}
