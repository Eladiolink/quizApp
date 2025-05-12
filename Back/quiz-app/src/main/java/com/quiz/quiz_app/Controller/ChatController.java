package com.quiz.quiz_app.Controller;

import com.quiz.quiz_app.Integration.RestLlmClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final RestLlmClient chatClient;

    public ChatController(RestLlmClient restLlmClient) {
        chatClient = restLlmClient;
    }

    @GetMapping("/activity/{activityId}/user/{userId}")
    public String chat(
            @PathVariable("activityId") Integer activityId,
            @PathVariable("userId") Integer userId
    ) {
        return chatClient.getRespostaChat(activityId,userId);
    }
}
