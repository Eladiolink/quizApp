package com.quiz.quiz_app.DTO.AnsweredQuestion;

import com.quiz.quiz_app.DTO.ActivityQuestion.ActivityQuestionResponseDTO;
import com.quiz.quiz_app.Enum.Option;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnsweredQuestionClientDTO {
    private ActivityQuestionResponseDTO question;
    private AnsweredQuestionResponseDTO answeredQuestion;
}
