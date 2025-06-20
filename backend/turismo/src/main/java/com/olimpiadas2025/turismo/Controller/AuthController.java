package com.olimpiadas2025.turismo.Controller;

import com.olimpiadas2025.turismo.model.Usuario;
import com.olimpiadas2025.turismo.service.UsuarioService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")

public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) {
        if (usuario.getRol() == null) {
            usuario.setRol(Usuario.Rol.Cliente);
        }
        return usuarioService.register(usuario);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody LoginRequest request) {
        return usuarioService.login(request.getEmail(), request.getPassword());
    }

    @PostMapping("/logout")
    public String logout() {
        return "Logout exitoso (placeholder)";
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }
}