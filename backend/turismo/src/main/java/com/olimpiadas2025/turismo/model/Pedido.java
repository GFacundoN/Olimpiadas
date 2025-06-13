package com.olimpiadas2025.turismo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idPaquete")
    private Paquete paquete;

    private LocalDateTime fechaPedido;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estado;

    public enum EstadoPedido {
        Completado,
        Pendiente,
        Anulado
    }
}