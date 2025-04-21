package com.quiz.quiz_app.DTO.AnsweredQuestion;

import com.quiz.quiz_app.Enum.Option;
import lombok.Data;

@Data
public class AnsweredQuestionRequestDTO {
    private Integer clientId;
    private Integer questionId;
    private Option selectedOption;
}
