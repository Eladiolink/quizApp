package com.quiz.quiz_app.DTO.User;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.quiz.quiz_app.Entity.User;
import com.quiz.quiz_app.Enum.UserType;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private Integer id;
    private String name;
    private UserType type;
}
