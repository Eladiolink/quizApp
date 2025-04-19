package com.quiz.quiz_app.Entity;

import com.quiz.quiz_app.Enum.Option;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "questoesRespondida")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnsweredQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private User client;

    @ManyToOne
    @JoinColumn(name = "id_questao", nullable = false)
    private ActivityQuestion question;

    @Enumerated(EnumType.STRING)
    @Column(name = "opcao", nullable = false)
    private Option selectedOption;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
