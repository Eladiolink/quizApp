package com.quiz.quiz_app.Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenRouterConfig {

    @Value("${openrouter.referer}")
    private String referer;

    @Value("${openrouter.title}")
    private String title;

    @Bean
    public RestTemplateCustomizer restTemplateCustomizer() {
        return restTemplate -> restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("HTTP-Referer", referer);
            request.getHeaders().add("X-Title", title);
            return execution.execute(request, body);
        });
    }
}
