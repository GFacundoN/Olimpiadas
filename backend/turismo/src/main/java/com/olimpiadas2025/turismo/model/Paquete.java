package com.olimpiadas2025.turismo.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paquete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPaquete;

    private Integer cantPersonas;
    private String origen;
    private String destino;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    private String alojamiento;

    @Enumerated(EnumType.STRING)
    private ClaseVuelo claseVuelo;

    private BigDecimal precio;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    public enum ClaseVuelo {
        ECONOMICA,
        EJECUTIVA,
        PREMIUM
    }
}
