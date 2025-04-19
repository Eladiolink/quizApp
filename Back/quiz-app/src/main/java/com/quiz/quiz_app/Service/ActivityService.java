package com.quiz.quiz_app.Service;

import com.quiz.quiz_app.Entity.Activity;
import com.quiz.quiz_app.Repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> getAll() {
        return activityRepository.findAll();
    }

    public Activity getById(Integer id) {
        Optional<Activity> activity = activityRepository.findById(id);
        return activity.orElse(null);
    }

    public Activity save(Activity activity) {
        return activityRepository.save(activity);
    }

    public void delete(Integer id) {
        activityRepository.deleteById(id);
    }
}