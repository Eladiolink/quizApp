package com.quiz.quiz_app.DTO.AnsweredQuestion;

import com.quiz.quiz_app.DTO.ActivityQuestion.ActivityQuestionResponseDTO;
import com.quiz.quiz_app.Entity.ActivityQuestion;
import com.quiz.quiz_app.Entity.AnsweredQuestion;
import lombok.Data;

import javax.swing.plaf.PanelUI;

@Data
public class AnsweredActivityQuestionDTO {
        private AnsweredQuestion question;
        private ActivityQuestion answeredQuestion;
}
