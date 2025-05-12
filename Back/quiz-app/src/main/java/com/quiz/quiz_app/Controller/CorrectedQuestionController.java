package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.DTO.CorrectedQuestion.CorrectedQuestionDTO;
import com.quiz.quiz_app.Service.CorrectedQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/corrected-question")
public class CorrectedQuestionController {

    @Autowired
    private CorrectedQuestionService correctedQuestionService;

    @GetMapping("/activity/{activityId}/user/{userId}")
    public List<CorrectedQuestionDTO> findByUserIdAndActivityId(
            @PathVariable("activityId") Integer activityId,
            @PathVariable("userId") Integer userId
    ){
        return correctedQuestionService.getCorrectedQuestionByActivity(activityId,userId);
    }
}
