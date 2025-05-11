package com.quiz.quiz_app.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "atividadesCorrigida", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"id_atividade", "id_cliente"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CorrectedActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_atividade", nullable = false)
    private Activity activity;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private User client;

    @ManyToOne
    @JoinColumn(name = "id_status", nullable = false)
    private StatusCorrection status;
}
