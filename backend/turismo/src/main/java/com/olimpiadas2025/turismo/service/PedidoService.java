package com.olimpiadas2025.turismo.service;

import com.olimpiadas2025.turismo.dto.PedidoDTO;
import com.olimpiadas2025.turismo.model.Paquete;
import com.olimpiadas2025.turismo.model.Pedido;
import com.olimpiadas2025.turismo.model.Usuario;
import com.olimpiadas2025.turismo.repository.PaqueteRepository;
import com.olimpiadas2025.turismo.repository.PedidoRepository;
import com.olimpiadas2025.turismo.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final PaqueteRepository paqueteRepository;
    private final UsuarioRepository usuarioRepository;
    private final MailService mailService;

    public List<Paquete> listarPaquetes() {
        return paqueteRepository.findAll();
    }

    public Pedido crearPedido(Integer idPaquete, Integer idUsuario, BigDecimal totalFinal) {
        Paquete paquete = paqueteRepository.findById(idPaquete)
                .orElseThrow(() -> new RuntimeException("Paquete no encontrado"));
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Pedido pedido = Pedido.builder()
                .paquete(paquete)
                .usuario(usuario)
                .fechaPedido(LocalDateTime.now())
                .estado(Pedido.EstadoPedido.Pendiente)
                .totalFinal(totalFinal)
                .build();

        return pedidoRepository.save(pedido);
    }

    public List<PedidoDTO> verPedidosDeUsuario(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return pedidoRepository.findByUsuario(usuario)
                .stream()
                .map(PedidoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void eliminarPedido(Integer id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        if (pedido.getEstado() == Pedido.EstadoPedido.Pendiente) {
            pedidoRepository.delete(pedido);
        } else {
            throw new RuntimeException("Solo se pueden eliminar pedidos pendientes");
        }
    }

    public List<PedidoDTO> listarTodosLosPedidosDTO(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (usuario.getRol() != Usuario.Rol.Jefe_Ventas) {
            throw new RuntimeException("No autorizado: solo el Jefe de Ventas puede acceder");
        }
        return pedidoRepository.findAll()
                .stream()
                .map(PedidoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public Pedido entregarPedido(Integer id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedido.setEstado(Pedido.EstadoPedido.Completado);

        mailService.enviarConfirmacionPedido(
                pedido.getUsuario().getEmail(),
                pedido.getUsuario().getNombres(),
                pedido
        );

        return pedido;
    }

    @Transactional
    public Pedido anularPedido(Integer id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedido.setEstado(Pedido.EstadoPedido.Anulado);

        mailService.enviarAnulacionPedido(
                pedido.getUsuario().getEmail(),
                pedido.getUsuario().getNombres(),
                pedido
        );

        return pedido;
    }
}