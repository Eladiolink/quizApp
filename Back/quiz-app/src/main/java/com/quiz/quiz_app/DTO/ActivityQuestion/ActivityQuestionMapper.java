package com.quiz.quiz_app.DTO.ActivityQuestion;

import com.quiz.quiz_app.Entity.ActivityQuestion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ActivityQuestionMapper {

    ActivityQuestion toActivityQuestion(ActivityQuestionResquestDTO dto);

    @Mapping(source = "activity.id", target = "activityId")
    ActivityQuestionResponseDTO toActivityQuestionResponseDTO(ActivityQuestion activityQuestion);

    @Mapping(source = "activity.id", target = "activityId")
    List<ActivityQuestionResponseDTO> toListActivityQuestionResponseDTO(List<ActivityQuestion> activityQuestions);
}
