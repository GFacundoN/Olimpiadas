package com.olimpiadas2025.turismo.repository;

import com.olimpiadas2025.turismo.model.Pedido;
import com.olimpiadas2025.turismo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByUsuario(Usuario usuario);
}
