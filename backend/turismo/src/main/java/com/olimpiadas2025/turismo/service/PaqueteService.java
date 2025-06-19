package com.olimpiadas2025.turismo.service;

import com.olimpiadas2025.turismo.exception.AplicacionException;
import com.olimpiadas2025.turismo.model.Paquete;
import com.olimpiadas2025.turismo.repository.PaqueteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaqueteService {

    private final PaqueteRepository paqueteRepository;

    public List<Paquete> listarPaquetes() {
        return paqueteRepository.findAll();
    }

    public Paquete crearPaquete(Paquete paquete) {
        return paqueteRepository.save(paquete);
    }

    public void eliminarPaquete(Integer id) {
        Paquete paquete = paqueteRepository.findById(id)
                .orElseThrow(() -> new AplicacionException("No se encontró el paquete especificado."));
        paqueteRepository.delete(paquete);
    }
}