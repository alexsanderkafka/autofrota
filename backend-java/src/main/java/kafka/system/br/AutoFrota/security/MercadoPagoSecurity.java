package kafka.system.br.AutoFrota.security;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import kafka.system.br.AutoFrota.exception.MercadoPagoException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Component
public class MercadoPagoSecurity {

    @Value("${mercado-pago.webhook.secret}")
    private String secret;
    
    public void verifySignature(String xSignature, String xRequestId, Map<String, Object> body, HttpServletRequest request) {
        // lógica de validação da assinatura
        // lançar exception se inválida

        System.out.println("Mercado pago webhook secret: " + secret);

        if(xSignature == null || xRequestId == null){
            throw new MercadoPagoException("Invalid signature");
        }

        Map<String, String> signatureParts = parseSignature(xSignature);
        String ts = signatureParts.get("ts");
        String v1 = signatureParts.get("v1");

        if(ts == null || ts.isEmpty() || v1 == null || v1.isEmpty()){
            throw new MercadoPagoException("Invalid signature");
        }


        String urlFull = buildFullUrl(request);
        System.out.println("URL completa: " + urlFull);

        String dataId = extractDataId(urlFull);

        String manifest = buildManifest(dataId, xRequestId, ts);
        System.out.println("Manifest: " + manifest);

        String generatedHash = generateHmacSha256(manifest, secret);
        System.out.println("Hash gerado: " + generatedHash);
        System.out.println("Hash recebido: " + v1);

        if (!generatedHash.equals(v1)) {
            throw new MercadoPagoException("Invalid signature");
        }

        System.out.println("Assinatura verificada com sucesso!");
    }

    private Map<String, String> parseSignature(String xSignature) {
        Map<String, String> parts = new HashMap<>();
        
        String[] signatureParts = xSignature.split(",");
        
        for (String part : signatureParts) {
            String[] keyValue = part.split("=", 2);
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();
                parts.put(key, value);
            }
        }
        
        return parts;
    }

    private String generateHmacSha256(String message, String webhookSecret2) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            
            byte[] hashBytes = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
            
            // Converter para hexadecimal
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            
            return hexString.toString();
            
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new MercadoPagoException("Invalid signature");
        }
    }


    private String buildFullUrl(HttpServletRequest request) {
         String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String requestURI = request.getRequestURI();
        String queryString = request.getQueryString();

        StringBuilder url = new StringBuilder();
        url.append(scheme).append("://").append(serverName);

        // Adicionar porta se não for padrão
        if ((scheme.equals("http") && serverPort != 80) || 
            (scheme.equals("https") && serverPort != 443)) {
            url.append(":").append(serverPort);
        }

        url.append(requestURI);

        if (queryString != null && !queryString.isEmpty()) {
            url.append("?").append(queryString);
        }

        return url.toString();
    }

    private String extractDataId(String urlFull) {
        try {
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(urlFull);
            String dataId = builder.build().getQueryParams().getFirst("data.id");
            
            if (dataId != null) {
                // Decodificar URL se necessário
                dataId = URLDecoder.decode(dataId, StandardCharsets.UTF_8);
            }
            
            return dataId;
        } catch (Exception e) {
            System.err.println("Erro ao extrair data.id: " + e.getMessage());
            return null;
        }
    }

    private String buildManifest(String dataId, String xRequestId, String ts) {
        StringBuilder manifest = new StringBuilder();

        if (dataId != null && !dataId.isEmpty()) {
            manifest.append("id:").append(dataId).append(";");
        }

        if (xRequestId != null && !xRequestId.isEmpty()) {
            manifest.append("request-id:").append(xRequestId).append(";");
        }

        manifest.append("ts:").append(ts).append(";");

        return manifest.toString();
    }
}
