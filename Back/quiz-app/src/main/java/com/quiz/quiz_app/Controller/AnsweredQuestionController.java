package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.DTO.AnsweredQuestion.AnsweredQuestionRequestDTO;
import com.quiz.quiz_app.DTO.AnsweredQuestion.AnsweredQuestionResponseDTO;
import com.quiz.quiz_app.Service.AnsweredQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answered-question")
@RequiredArgsConstructor
public class AnsweredQuestionController {

    private final AnsweredQuestionService answeredQuestionService;

    // CREATE
    @PostMapping
    public AnsweredQuestionResponseDTO create(@RequestBody AnsweredQuestionRequestDTO dto) {
        return answeredQuestionService.create(dto);
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
}
