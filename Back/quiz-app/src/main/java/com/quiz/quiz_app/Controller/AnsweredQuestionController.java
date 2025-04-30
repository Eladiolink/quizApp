package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.DTO.AnsweredQuestion.AnsweredQuestionRequestDTO;
import com.quiz.quiz_app.DTO.AnsweredQuestion.AnsweredQuestionResponseDTO;
import com.quiz.quiz_app.Service.AnsweredQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
@RequestMapping("/answered-question")
public class AnsweredQuestionController {
    @Autowired
    private AnsweredQuestionService answeredQuestionService;

    // CREATE
    @PostMapping
    public ResponseEntity create(@RequestBody AnsweredQuestionRequestDTO dto) {
        try{
           return ResponseEntity.ok(answeredQuestionService.create(dto));
        }catch (IllegalArgumentException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    // GET ALL
    @GetMapping
    public List<AnsweredQuestionResponseDTO> findAll() {
        return answeredQuestionService.findAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public AnsweredQuestionResponseDTO findById(@PathVariable Integer id) {
        return answeredQuestionService.findById(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        answeredQuestionService.delete(id);
    }

    @GetMapping("/{id}/user/{userId}")
    public ResponseEntity activityClientAnswered(
            @PathVariable("id") Integer id,
            @PathVariable("userId") Integer userId
    ){
        return ResponseEntity.ok( answeredQuestionService.activityClientAnswered(id,userId) );
    }
}
