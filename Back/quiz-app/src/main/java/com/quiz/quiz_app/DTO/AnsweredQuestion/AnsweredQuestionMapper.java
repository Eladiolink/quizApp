package com.quiz.quiz_app.DTO.AnsweredQuestion;

import com.quiz.quiz_app.Entity.AnsweredQuestion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnsweredQuestionMapper {
    AnsweredQuestion toAnsweredQuestion(AnsweredQuestionRequestDTO dto);

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "question.id", target = "questionId")
    AnsweredQuestionResponseDTO toAnsweredQuestionResponseDTO(AnsweredQuestion entity);


    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "question.id", target = "questionId")
    List<AnsweredQuestionResponseDTO> toListAnsweredQuestionResponseDTO(List<AnsweredQuestion> entities);

//    AnsweredQuestionClientDTO AnsweredQuestionClientDTOmap(Object[] value);
//    List<AnsweredQuestionClientDTO> toAnsweredQuestionClientDTO(List<Object[]> entities);
}
