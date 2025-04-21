package com.quiz.quiz_app.DTO.ActivityQuestion;

import com.quiz.quiz_app.Enum.CorrectOption;
import lombok.Data;

@Data
public class ActivityQuestionResquestDTO {
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String optionE;
    private CorrectOption correctOption;
    private String image;
    private Integer activityId;
}
