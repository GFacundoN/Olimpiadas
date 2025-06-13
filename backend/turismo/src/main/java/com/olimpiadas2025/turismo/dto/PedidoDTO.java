package com.olimpiadas2025.turismo.dto;

import com.olimpiadas2025.turismo.model.Pedido;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PedidoDTO {
    private Integer idPedido;
    private LocalDateTime fechaPedido;
    private Pedido.EstadoPedido estado;
    private BigDecimal totalFinal;
    private String origen;
    private String destino;
    private BigDecimal precio;
    private String descripcion;

    public static PedidoDTO fromEntity(Pedido pedido) {
        return PedidoDTO.builder()
                .idPedido(pedido.getIdPedido())
                .fechaPedido(pedido.getFechaPedido())
                .estado(pedido.getEstado())
                .totalFinal(pedido.getTotalFinal())
                .origen(pedido.getPaquete().getOrigen())
                .destino(pedido.getPaquete().getDestino())
                .precio(pedido.getPaquete().getPrecio())
                .descripcion(pedido.getPaquete().getDescripcion())
                .build();
    }
}
