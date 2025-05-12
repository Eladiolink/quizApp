package com.quiz.quiz_app.DTO.CorrectedQuestion;

import com.quiz.quiz_app.Entity.CorrectedQuestion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CorrectedQuestionDTO {
    public Integer id;
    public Integer clientId;
    public Integer questionId;
    public String correction;
    public String model;
    public LocalDateTime createdAt;

    public CorrectedQuestionDTO(CorrectedQuestion correctedQuestion){
        id = correctedQuestion.getId();
        clientId = correctedQuestion.getClient().getId();
        questionId = correctedQuestion.getQuestion().getId();
        correction = correctedQuestion.getCorrection();
        model = correctedQuestion.getModel();
        createdAt = correctedQuestion.getCreatedAt();
    }
}