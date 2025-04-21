package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.DTO.ActivityQuestion.ActivityQuestionResponseDTO;
import com.quiz.quiz_app.DTO.ActivityQuestion.ActivityQuestionResquestDTO;
import com.quiz.quiz_app.Service.ActivityQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity-question")
public class ActivityQuestionController {

    @Autowired
    private ActivityQuestionService activityQuestionService;

    @PostMapping
    public ActivityQuestionResponseDTO create(@RequestBody ActivityQuestionResquestDTO dto){
        return activityQuestionService.create(dto);
    }

    @GetMapping("/findAllByActivity/{activityId}")
    public List<ActivityQuestionResponseDTO> findAllByActivity(@PathVariable Integer activityId) {
        return activityQuestionService.findAllByActivityId(activityId);
    }


}