package com.quiz.quiz_app.DTO.AnsweredQuestion;

import com.quiz.quiz_app.Enum.Option;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnsweredQuestionResponseDTO {
    private Integer id;
    private Integer clientId;
    private Integer questionId;
    private Option selectedOption;
    private LocalDateTime createdAt;
}
