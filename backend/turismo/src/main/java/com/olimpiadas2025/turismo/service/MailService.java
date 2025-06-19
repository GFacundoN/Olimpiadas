package com.olimpiadas2025.turismo.service;

import com.olimpiadas2025.turismo.exception.AplicacionException;
import com.olimpiadas2025.turismo.model.Pedido;
import com.olimpiadas2025.turismo.model.Usuario;
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

    @Value("${mail.subject.nuevo}")
    private String subjectNuevo;

    private final String EMAIL_EMPRESA = "escapadasventas@gmail.com";

    public void enviarConfirmacionPedido(String destinatario, String nombre, Pedido pedido) {
        String asunto = subjectConfirmacion;
        String cuerpoCliente = """
            <h1>Hola %s,</h1>
            <p>Tu pedido fue <b>confirmado</b> exitosamente.</p>
            <p>Destino: <strong>%s</strong></p>
            <p>Fechas: del <strong>%s</strong> al <strong>%s</strong></p>
            <p>Gracias por confiar en E-Scapadas!</p>
        """.formatted(nombre, pedido.getPaquete().getDestino(),
                pedido.getPaquete().getFechaInicio(), pedido.getPaquete().getFechaFin());

        String cuerpoEmpresa = generarCuerpoEmpresa("Pedido confirmado", pedido);
        enviarCorreo(destinatario, asunto, cuerpoCliente);
        enviarCorreo(EMAIL_EMPRESA, asunto, cuerpoEmpresa);
    }

    public void enviarAnulacionPedido(String destinatario, String nombre, Pedido pedido) {
        String asunto = subjectAnulacion;
        String cuerpoCliente = """
            <h1>Hola %s,</h1>
            <p>Tu pedido fue <b>anulado</b>.</p>
            <p>Destino: <strong>%s</strong></p>
            <p>Fechas: del <strong>%s</strong> al <strong>%s</strong></p>
            <p>Si tenés dudas, podés contactarte con el soporte escapadasventas@gmail.com.</p>
        """.formatted(nombre, pedido.getPaquete().getDestino(),
                pedido.getPaquete().getFechaInicio(), pedido.getPaquete().getFechaFin());

        String cuerpoEmpresa = generarCuerpoEmpresa("Pedido anulado", pedido);
        enviarCorreo(destinatario, asunto, cuerpoCliente);
        enviarCorreo(EMAIL_EMPRESA, asunto, cuerpoEmpresa);
    }

    public void enviarNotificacionNuevoPedido(Pedido pedido) {
        Usuario u = pedido.getUsuario();
        String asunto = subjectNuevo;

        String cuerpoCliente = """
            <h1>Gracias por tu compra %s!</h1>
            <p>Tu pedido a <strong>%s</strong> fue creado correctamente.</p>
            <p>Fechas: %s a %s</p>
            <p>Total: $%s</p>
        """.formatted(u.getNombres(), pedido.getPaquete().getDestino(),
                pedido.getPaquete().getFechaInicio(), pedido.getPaquete().getFechaFin(),
                pedido.getTotalFinal());

        String cuerpoEmpresa = generarCuerpoEmpresa("Nuevo pedido creado", pedido);
        enviarCorreo(u.getEmail(), asunto, cuerpoCliente);
        enviarCorreo(EMAIL_EMPRESA, asunto, cuerpoEmpresa);
    }

    private String generarCuerpoEmpresa(String titulo, Pedido pedido) {
        Usuario u = pedido.getUsuario();
        return """
            <h1>%s</h1>
            <ul>
              <li><b>ID Pedido:</b> %d</li>
              <li><b>Cliente:</b> %s</li>
              <li><b>Email:</b> %s</li>
              <li><b>Teléfono:</b> %s</li>
              <li><b>Destino:</b> %s</li>
              <li><b>Fechas:</b> %s al %s</li>
              <li><b>Total:</b> $%s</li>
            </ul>
        """.formatted(titulo, pedido.getIdPedido(), u.getNombres(), u.getEmail(), u.getTelefono(),
                pedido.getPaquete().getDestino(), pedido.getPaquete().getFechaInicio(),
                pedido.getPaquete().getFechaFin(), pedido.getTotalFinal());
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
            throw new AplicacionException("No se pudo enviar el correo electrónico: " + e.getMessage());
        } catch (Exception e) {
            throw new AplicacionException("Error general al enviar el correo: " + e.getMessage());
        }
    }
}