package com.quiz.quiz_app.DTO.Activity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityResponseDTO {

    private Integer id;
    private String title;
    private String description;
    private Integer createdBy;
    private LocalDateTime createdAt;
    private Integer activityYear;

}

