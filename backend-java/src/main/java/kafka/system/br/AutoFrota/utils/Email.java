package kafka.system.br.AutoFrota.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Component
public class Email {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public void sendPasswordResetCode(String to, String code) { // throws MessagingException
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(MimeMessage.RecipientType.TO, to);
            message.setSubject("Seu código de verificação");

             String htmlContent = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;\">" +
                "<h2 style=\"color: #333; text-align: center;\">Redefinição de senha</h2>" +
                "<p style=\"font-size: 16px; color: #555; text-align: center;\">Esse é o seu código para alterar a sua senha:</p>" +
                "<div style=\"background-color: #fff; padding: 15px; margin: 20px auto; text-align: center; border-radius: 8px; max-width: 220px; border: 5px solid #2563EB;\">" +
                "   <span style=\"font-size: 28px; color: #333; font-weight: bold; letter-spacing: 2px;\">" + code + "</span>" +
                "</div>" +
                "<p style=\"font-size: 14px; color: #888; text-align: center;\">Se você não solicitou essa alteração, ignore este e-mail.</p>" +
                "<p style=\"font-size: 12px; color: #bbb; text-align: center; margin-top: 30px;\">&copy; 2025 AutoFrota. Todos os direitos reservados.</p>" +
                "</div>";
                                
            message.setContent(htmlContent, "text/html; charset=utf-8");

            javaMailSender.send(message);   
        } catch (Exception e) {
            System.out.println("Error sending email: " + e.getMessage());
            throw new RuntimeException("Error sending email");
        }
    }

    public void sendPaymentConfirmation(String to){
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(MimeMessage.RecipientType.TO, to);
            message.setSubject("Confirmação de pagamento recebida");

            String htmlContent = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;\">" +
                "<h2 style=\"color: #333; text-align: center;\">Pagamento confirmado!</h2>" +
                "<p style=\"font-size: 16px; color: #555; text-align: center;\">Recebemos o seu pagamento com sucesso.</p>" +

                "<div style=\"background-color: #f1f1f1; padding: 15px; margin: 20px auto; border-radius: 8px; max-width: 260px; border: 5px solid #2563EB; text-align: center;\">" +
                "<p style=\"font-size: 20px; color: #333; margin: 0;\">Você já pode acessar o sistema.</p>" +
                "</div>" +

                "<p style=\"font-size: 14px; color: #888; text-align: center;\">Se houver qualquer divergência, entre em contato com nosso suporte.</p>" +
                "<p style=\"font-size: 12px; color: #bbb; text-align: center; margin-top: 30px;\">&copy; 2025 AutoFrota. Todos os direitos reservados.</p>" +
                "</div>";
                                
            message.setContent(htmlContent, "text/html; charset=utf-8");

            javaMailSender.send(message);   
        } catch (Exception e) {
            System.out.println("Error sending email: " + e.getMessage());
            throw new RuntimeException("Error sending email");
        }
    }
    
}
