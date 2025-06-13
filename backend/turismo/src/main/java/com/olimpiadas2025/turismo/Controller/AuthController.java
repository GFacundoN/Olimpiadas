package com.olimpiadas2025.turismo.Controller;

import com.olimpiadas2025.turismo.model.Usuario;
import com.olimpiadas2025.turismo.service.UsuarioService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) {
        return usuarioService.register(usuario);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody LoginRequest request) {
        // CORRECTO: Pasamos el email del request al método de login.
        return usuarioService.login(request.getEmail(), request.getPassword());
    }

    @PostMapping("/logout")
    public String logout() {
        return "Logout exitoso (placeholder)";
    }

    @Data
    public static class LoginRequest {
        // CORRECTO: Cambiado de "mail" a "email" para consistencia.
        private String email;
        private String password;
    }
}