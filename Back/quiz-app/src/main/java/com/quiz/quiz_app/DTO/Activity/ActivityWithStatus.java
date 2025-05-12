package com.quiz.quiz_app.DTO.Activity;

import com.quiz.quiz_app.Entity.Activity;
import com.quiz.quiz_app.Entity.StatusCorrection;

import java.time.LocalDateTime;

public class ActivityWithStatus{
    public Integer id;
    public String title;
    public String description;
    public Integer createdBy;
    public LocalDateTime createdAt;
    public String status;

    public ActivityWithStatus(Activity activity, String statusCorrection){
        id = activity.getId();
        title = activity.getTitle();
        description = activity.getDescription();
        createdBy = activity.getCreatedBy().getId();
        createdAt = activity.getCreatedAt();
        status = statusCorrection;
    }
}
