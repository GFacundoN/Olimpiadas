package com.olimpiadas2025.turismo.service;

import com.olimpiadas2025.turismo.model.Pedido;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String from;

    @Value("${mail.from.name}")
    private String fromName;

    @Value("${mail.subject.confirmacion}")
    private String subjectConfirmacion;

    @Value("${mail.subject.anulacion}")
    private String subjectAnulacion;

    public void enviarConfirmacionPedido(String destinatario, String nombre, Pedido pedido) {
        String asunto = subjectConfirmacion;
        String cuerpo = "<h1>Hola " + nombre + ",</h1>"
                + "<p>Tu pedido nº<strong>" + pedido.getIdPedido() + "</strong> fue <b>confirmado</b> exitosamente.</p>"
                + "<p>Destino: <strong>" + pedido.getPaquete().getDestino() + "</strong></p>"
                + "<p>Fecha: del <strong>" + pedido.getPaquete().getFechaInicio() + "</strong> al <strong>" + pedido.getPaquete().getFechaFin() + "</strong></p>"
                + "<p>Gracias por confiar en E-Scapadas!</p>";
        enviarCorreo(destinatario, asunto, cuerpo);
    }

    public void enviarAnulacionPedido(String destinatario, String nombre, Pedido pedido) {
        String asunto = subjectAnulacion;
        String cuerpo = "<h1>Hola " + nombre + ",</h1>"
                + "<p>Tu pedido nº<strong>" + pedido.getIdPedido() + "</strong> fue <b>anulado</b>.</p>"
                + "<p>Destino: <strong>" + pedido.getPaquete().getDestino() + "</strong></p>"
                + "<p>Fecha: del <strong>" + pedido.getPaquete().getFechaInicio() + "</strong> al <strong>" + pedido.getPaquete().getFechaFin() + "</strong></p>"
                + "<p>Si tenés dudas, podés contactarte con soporte.</p>";
        enviarCorreo(destinatario, asunto, cuerpo);
    }

    private void enviarCorreo(String destinatario, String asunto, String cuerpoHtml) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true);

            helper.setTo(destinatario);
            helper.setSubject(asunto);
            helper.setText(cuerpoHtml, true);
            helper.setFrom(from, fromName);

            mailSender.send(mensaje);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar correo: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Error general: " + e.getMessage());
        }
    }
}
