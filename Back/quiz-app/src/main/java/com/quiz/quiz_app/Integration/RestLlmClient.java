package com.quiz.quiz_app.Integration;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class RestLlmClient {

    private final RestTemplate restTemplate;

    public RestLlmClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getRespostaChat(int activityId, int userId) {
        String url = "http://localhost:8000/chat/activity/" + activityId + "/user/" + userId;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}
