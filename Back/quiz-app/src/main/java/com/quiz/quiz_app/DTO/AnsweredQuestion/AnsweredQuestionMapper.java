package com.quiz.quiz_app.DTO.AnsweredQuestion;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnsweredQuestionMapper {
}
