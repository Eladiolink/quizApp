package com.quiz.quiz_app.Configuration;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;


@Configuration
    public class SpringAiConfig {

        @Value("${spring.ai.openai.api-key}")
        private String apiKey;

        @Value("${spring.ai.openai.base-url}")
        private String baseUrl;

        @Value("${openrouter.referer}")
        private String referer;

        @Value("${openrouter.title}")
        private String title;


    @Bean
    ChatClient chatClient(ChatClient.Builder builder) {
        return builder.defaultSystem("You are a friendly chat bot that answers question in the voice of a {voice}")
                .build();
    }
    }

