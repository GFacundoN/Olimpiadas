package com.olimpiadas2025.turismo.dto;

import com.olimpiadas2025.turismo.model.Paquete;
import com.olimpiadas2025.turismo.model.Pedido;
import com.olimpiadas2025.turismo.model.Usuario;
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

    private ClienteDTO cliente;

    @Data
    @Builder
    public static class ClienteDTO {
        private Integer id;
        private String nombre;
        private String email;
        private String telefono;
    }

    public static PedidoDTO fromEntity(Pedido pedido) {
        Usuario usuario = pedido.getUsuario();
        Paquete paquete = pedido.getPaquete();

        return PedidoDTO.builder()
                .idPedido(pedido.getIdPedido())
                .fechaPedido(pedido.getFechaPedido())
                .estado(pedido.getEstado())
                .totalFinal(pedido.getTotalFinal())
                .origen(paquete.getOrigen())
                .destino(paquete.getDestino())
                .precio(paquete.getPrecio())
                .descripcion(paquete.getDescripcion())
                .cliente(ClienteDTO.builder()
                        .id(usuario.getIdUsuario())
                        .nombre(usuario.getNombres())
                        .email(usuario.getEmail())
                        .telefono(usuario.getTelefono())
                        .build())
                .build();
    }
}
