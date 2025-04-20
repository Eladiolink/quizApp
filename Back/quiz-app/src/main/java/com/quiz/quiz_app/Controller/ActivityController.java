package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.DTO.Activity.ActivityRequestDTO;
import com.quiz.quiz_app.DTO.Activity.ActivityResponseDTO;
import com.quiz.quiz_app.Entity.Activity;
import com.quiz.quiz_app.Service.ActivityService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping
    public List<ActivityResponseDTO> getAll() {
        return activityService.getAll();
    }

    @GetMapping("/{id}")
    public ActivityResponseDTO getById(@PathVariable Integer id) {
        return activityService.getById(id);
    }

    @PostMapping("create")
    public ActivityResponseDTO create(@RequestBody ActivityRequestDTO activity) {
        return activityService.save(activity);
    }

    @PutMapping("/{id}")
    public ActivityResponseDTO update(@PathVariable Integer id, @RequestBody ActivityRequestDTO activity) {
        return activityService.save(activity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        activityService.delete(id);
    }
}