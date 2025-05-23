package com.quiz.quiz_app.DTO.Activity;

import com.quiz.quiz_app.Entity.Activity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;


import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ActivityMapper {
    Activity toActivity(ActivityRequestDTO dto);

    @Mapping(source = "createdBy.id", target = "createdBy")
    ActivityResponseDTO toActivityResponseDto(Activity activity);
    List<ActivityResponseDTO> toListActivityResponseDTO(List<Activity> activities);


}

