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
        usuario.setRol(Usuario.Rol.Cliente); // fuerza el rol a cliente
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