package com.quiz.quiz_app.Entity;

import com.quiz.quiz_app.Enum.CorrectOption;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "questoes_atividade")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Lob
    @Column(name = "questao", nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(name = "opcao_a", nullable = false)
    private String optionA;

    @Column(name = "opcao_b", nullable = false)
    private String optionB;

    @Column(name = "opcao_c", nullable = false)
    private String optionC;

    @Column(name = "opcao_d", nullable = false)
    private String optionD;

    @Column(name = "opcao_e", nullable = false)
    private String optionE;

    @Enumerated(EnumType.STRING)
    @Column(name = "opcao_correta", nullable = false)
    private CorrectOption correctOption;

    @Column(name = "imagem")
    private String image;

    @ManyToOne
    @JoinColumn(name = "id_atividade", nullable = false)
    private Activity activity;

    @Column(name = "area_conhecimento")
    private String knowledgeArea;

    @Column(name = "numero_questao")
    private Integer questionNumber;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
