package com.olimpiadas2025.turismo.service;

import com.olimpiadas2025.turismo.dto.PedidoDTO;
import com.olimpiadas2025.turismo.exception.AplicacionException;
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

    @Transactional
    public Pedido crearPedido(Integer idPaquete, Integer idUsuario, BigDecimal totalFinal) {
        Paquete paquete = paqueteRepository.findById(idPaquete)
                .orElseThrow(() -> new AplicacionException("No se encontró el paquete especificado."));
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new AplicacionException("No se encontró el usuario especificado."));

        Pedido pedido = Pedido.builder()
                .paquete(paquete)
                .usuario(usuario)
                .fechaPedido(LocalDateTime.now())
                .estado(Pedido.EstadoPedido.Pendiente)
                .totalFinal(totalFinal)
                .build();

        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        mailService.enviarNotificacionNuevoPedido(pedidoGuardado);

        return pedidoGuardado;
    }

    public List<PedidoDTO> verPedidosDeUsuario(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new AplicacionException("No se encontró el usuario especificado."));
        return pedidoRepository.findByUsuario(usuario)
                .stream()
                .map(PedidoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void eliminarPedido(Integer id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new AplicacionException("No se encontró el pedido solicitado."));
        if (pedido.getEstado() == Pedido.EstadoPedido.Pendiente) {
            pedidoRepository.delete(pedido);
        } else {
            throw new AplicacionException("Solo se pueden eliminar los pedidos que están pendientes.");
        }
    }

    public List<PedidoDTO> listarTodosLosPedidosDTO(Integer idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new AplicacionException("No se encontró el usuario especificado."));
        if (usuario.getRol() != Usuario.Rol.Jefe_Ventas) {
            throw new AplicacionException("Acceso denegado: solo el Jefe de Ventas puede realizar esta operación.");
        }
        return pedidoRepository.findAll()
                .stream()
                .map(PedidoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public Pedido entregarPedido(Integer id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new AplicacionException("No se encontró el pedido solicitado."));
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
                .orElseThrow(() -> new AplicacionException("No se encontró el pedido solicitado."));
        pedido.setEstado(Pedido.EstadoPedido.Anulado);

        mailService.enviarAnulacionPedido(
                pedido.getUsuario().getEmail(),
                pedido.getUsuario().getNombres(),
                pedido
        );

        return pedido;
    }
}