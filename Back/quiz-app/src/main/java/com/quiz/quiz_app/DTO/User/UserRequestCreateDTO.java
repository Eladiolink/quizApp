package com.quiz.quiz_app.DTO.User;

import com.quiz.quiz_app.Enum.UserType;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
public class UserRequestCreateDTO {
    private String name;
    private String email;
    private String password;
    private UserType type;

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public UserType getType() {
        return type;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setType(UserType type) {
        this.type = type;
    }
}
