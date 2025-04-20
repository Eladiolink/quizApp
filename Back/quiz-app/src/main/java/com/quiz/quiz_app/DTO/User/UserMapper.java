package com.quiz.quiz_app.DTO.User;

import com.quiz.quiz_app.Entity.User;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );

    User UserRequestCreateDTOToUser(UserRequestCreateDTO dto);

    UserResponseDTO toUserResponseDTO(User user);

    List<UserResponseDTO> toDtoList(List<User> users);
}
