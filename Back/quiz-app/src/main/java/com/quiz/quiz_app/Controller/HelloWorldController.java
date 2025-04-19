package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.Service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ping")
public class HelloWorldController {

    @Autowired
    private HelloWorldService helloWorldService;

    // GET /hello-world
    @GetMapping
    public String helloWorld(){
       return "pong!";
    }
}
