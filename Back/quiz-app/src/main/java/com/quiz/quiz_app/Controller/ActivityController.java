package com.quiz.quiz_app.Controller;

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
    public List<Activity> getAll() {
        return activityService.getAll();
    }

    @GetMapping("/{id}")
    public Activity getById(@PathVariable Integer id) {
        return activityService.getById(id);
    }

    @PostMapping
    public Activity create(@RequestBody Activity activity) {
        return activityService.save(activity);
    }

    @PutMapping("/{id}")
    public Activity update(@PathVariable Integer id, @RequestBody Activity activity) {
        activity.setId(id);
        return activityService.save(activity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        activityService.delete(id);
    }
}