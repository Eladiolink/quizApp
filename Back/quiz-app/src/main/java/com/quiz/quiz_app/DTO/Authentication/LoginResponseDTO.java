package com.quiz.quiz_app.DTO.Authentication;

import com.quiz.quiz_app.Enum.UserType;

public record LoginResponseDTO(String token, UserType role, Integer id, String name) {
}
