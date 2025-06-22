package com.olimpiadas2025.turismo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;

    @Column(nullable = false) // Mapea el campo a una columna que no puede ser nula
    private String nombres;

    @Column(nullable = false, unique = true) // La columna no puede ser nula y debe ser única (no puede repetirse el email)
    private String email;

    private String telefono; // Este campo puede ser nulo (por defecto)

    @Column(nullable = false) // Este campo no puede ser nulo
    private String password;

    @Enumerated(EnumType.STRING) // Indica que el enum se guarda en la base de datos como texto (no como número)
    private Rol rol;

    // Enumeración interna para definir los posibles roles de un usuario
    public enum Rol {
        Cliente, 
        Jefe_Ventas
    }
}
