package com.olimpiadas2025.turismo.Controller;

import com.olimpiadas2025.turismo.dto.PedidoDTO;
import com.olimpiadas2025.turismo.model.Paquete;
import com.olimpiadas2025.turismo.model.Pedido;
import com.olimpiadas2025.turismo.service.PaqueteService;
import com.olimpiadas2025.turismo.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {

    private final PedidoService pedidoService;
    private final PaqueteService paqueteService;

    @GetMapping("/paquetes")
    public List<Paquete> listarPaquetes() {
        return paqueteService.listarPaquetes();
    }

    @PostMapping("/paquetes")
    public Paquete crearPaquete(
            @RequestBody Paquete paquete) {
        return paqueteService.crearPaquete(paquete);
    }

    @DeleteMapping("/paquetes/{id}")
    public void eliminarPaquete(
            @PathVariable Integer id) {
        paqueteService.eliminarPaquete(id);
    }

    @PostMapping("/pedidos")
    public Pedido crearPedido(
            @RequestParam Integer idPaquete,
            @RequestParam Integer idUsuario,
            @RequestParam BigDecimal totalFinal) {
        return pedidoService.crearPedido(idPaquete, idUsuario, totalFinal);
    }

    @GetMapping("/pedidos/mis-pedidos")
    public List<PedidoDTO> verPedidosDeUsuario(
            @RequestParam Integer idUsuario) {
        return pedidoService.verPedidosDeUsuario(idUsuario);
    }

    @DeleteMapping("/pedidos/{id}")
    public void eliminarPedido(
            @PathVariable Integer id) {
        pedidoService.eliminarPedido(id);
    }

    @GetMapping("/admin/pedidos")
    public List<PedidoDTO> listarTodosLosPedidos(@RequestParam Integer idUsuario) {
        return pedidoService.listarTodosLosPedidosDTO(idUsuario);
    }

    @PatchMapping("/admin/pedidos/{id}/entregar")
    public Pedido entregarPedido(
            @PathVariable Integer id) {
        return pedidoService.entregarPedido(id);
    }

    @PatchMapping("/admin/pedidos/{id}/anular")
    public Pedido anularPedido(
            @PathVariable Integer id) {
        return pedidoService.anularPedido(id);
    }
}
