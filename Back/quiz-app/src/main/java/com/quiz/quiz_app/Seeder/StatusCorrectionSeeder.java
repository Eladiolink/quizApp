package com.quiz.quiz_app.Seeder;

import com.quiz.quiz_app.Entity.StatusCorrection;
import com.quiz.quiz_app.Repository.StatusCorrectionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StatusCorrectionSeeder implements CommandLineRunner {

    private final StatusCorrectionRepository repository;

    public StatusCorrectionSeeder(StatusCorrectionRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            repository.save(new StatusCorrection(null, "Pendente"));
            repository.save(new StatusCorrection(null, "Corrigido"));
        }
    }
}

