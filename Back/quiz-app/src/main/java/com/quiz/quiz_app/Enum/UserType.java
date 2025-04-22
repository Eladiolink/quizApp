package com.quiz.quiz_app.Enum;

import com.fasterxml.jackson.annotation.JsonValue;
import com.sun.jdi.PrimitiveValue;

public enum UserType {
    ADMIN("ADMIN"),
    CLIENTE("CLIENTE");

    private String userType;

    UserType(String userType){
        this.userType = userType;
    }

    public String getUserType(){
        return this.userType;
    }
}

