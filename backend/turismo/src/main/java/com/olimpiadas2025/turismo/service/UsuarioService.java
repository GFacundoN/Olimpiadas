package com.olimpiadas2025.turismo.service;

import com.olimpiadas2025.turismo.exception.AplicacionException;
import com.olimpiadas2025.turismo.model.Usuario;
import com.olimpiadas2025.turismo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario register(Usuario usuario) {
        Optional<Usuario> existing = usuarioRepository.findByEmail(usuario.getEmail());
        if (existing.isPresent()) {
            throw new AplicacionException("El correo electrónico ya está registrado. Por favor, utilice otro.");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new AplicacionException("La contraseña ingresada es incorrecta.");
        }
        return usuario;
    }
}