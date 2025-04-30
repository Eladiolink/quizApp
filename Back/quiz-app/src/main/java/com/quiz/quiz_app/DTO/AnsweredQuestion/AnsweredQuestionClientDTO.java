package com.quiz.quiz_app.DTO.AnsweredQuestion;

import com.quiz.quiz_app.DTO.ActivityQuestion.ActivityQuestionResponseDTO;
import com.quiz.quiz_app.Entity.ActivityQuestion;
import com.quiz.quiz_app.Entity.AnsweredQuestion;
import com.quiz.quiz_app.Enum.Option;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnsweredQuestionClientDTO {
    private ActivityQuestionResponseDTO activityQuestion;
    private Option selectedOption;

    public AnsweredQuestionClientDTO(ActivityQuestion activityQuestion, Option selectedOption) {

        this.activityQuestion.setQuestion(activityQuestion.getQuestion());
        this.activityQuestion.setOptionA(activityQuestion.getOptionA());
        this.activityQuestion.setOptionB(activityQuestion.getOptionB());
        this.activityQuestion.setOptionC(activityQuestion.getOptionC());
        this.activityQuestion.setOptionD(activityQuestion.getOptionD());
        this.activityQuestion.setOptionE(activityQuestion.getOptionE());
        this.activityQuestion.setCorrectOption(activityQuestion.getCorrectOption());
        this.activityQuestion.setId(activityQuestion.getId());
        this.activityQuestion.setImage(activityQuestion.getImage());
        this.activityQuestion.setActivityId(activityQuestion.getActivity().getId());

        this.selectedOption = selectedOption;
    }
}
