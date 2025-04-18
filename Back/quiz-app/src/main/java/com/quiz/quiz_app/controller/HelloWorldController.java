package com.quiz.quiz_app.controller;

import com.quiz.quiz_app.domain.User;
import com.quiz.quiz_app.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello-world")
public class HelloWorldController {

    @Autowired
    private HelloWorldService helloWorldService;

    // GET /hello-world
    @GetMapping
    public String helloWorld(){
       return helloWorldService.helloWorld("Eladio");
    }

    @PostMapping("")
    public String helloWorldPost(@RequestBody User body){
        return "Hello World Post " + body.getName();
    }

    @PostMapping("/{id}")
    public String helloWorldPost(@PathVariable("id") int id ,@RequestBody User body){
        return "Hello World Post " + body.getName()+ " com id: "+id;
    }
}
