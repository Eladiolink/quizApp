package com.quiz.quiz_app.DTO.Activity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityRequestDTO {
    private String title;
    private String description;
    private Integer createdById;
}
