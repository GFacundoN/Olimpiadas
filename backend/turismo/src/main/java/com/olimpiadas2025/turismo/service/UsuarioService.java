package com.olimpiadas2025.turismo.service;

import com.olimpiadas2025.turismo.model.Usuario;
import com.olimpiadas2025.turismo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario register(Usuario usuario) {
        Optional<Usuario> existing = usuarioRepository.findByEmail(usuario.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("El correo ya está registrado.");
        }
        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));
        if (!usuario.getPassword().equals(password)) {
            throw new RuntimeException("Contraseña incorrecta.");
        }
        return usuario;
    }
}