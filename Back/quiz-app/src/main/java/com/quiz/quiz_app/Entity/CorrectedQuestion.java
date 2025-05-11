package com.quiz.quiz_app.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "questoesCorrigida")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CorrectedQuestion {
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

    @Lob
    @Column(name = "correcao", nullable = false, columnDefinition = "TEXT")
    private String correction;

    @Column(name = "modelo", length = 256,nullable = false)
    private String model;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
