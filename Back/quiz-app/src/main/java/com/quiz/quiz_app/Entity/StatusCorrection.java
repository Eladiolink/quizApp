package com.quiz.quiz_app.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "statusCorrecao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusCorrection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "statusDesc", length = 32,nullable = false)
    private String statusDesc;

}
