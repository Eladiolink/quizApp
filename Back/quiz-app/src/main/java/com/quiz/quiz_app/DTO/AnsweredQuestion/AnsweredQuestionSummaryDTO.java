package com.quiz.quiz_app.DTO.AnsweredQuestion;

import com.quiz.quiz_app.Enum.CorrectOption;
import com.quiz.quiz_app.Enum.Option;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AnsweredQuestionSummaryDTO {

    private Integer questionId;
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String optionE;
    private CorrectOption correctOption;
    private String image;
    private String knowledgeArea;
    private Option selectedOption;
    private Integer questionNumber;

    public AnsweredQuestionSummaryDTO(Object[] a) {
        this.questionId = (Integer) a[0];
        this.question = (String) a[1];
        this.optionA = (String) a[2];
        this.optionB = (String) a[3];
        this.optionC = (String) a[4];
        this.optionD = (String) a[5];
        this.optionE = (String) a[6];
        this.correctOption = (CorrectOption) a[7];
        this.image = (String) a[8];
        this.knowledgeArea = (String) a[9];
        this.questionNumber = (Integer) a[10];
    }

    // Getters e setters

}
