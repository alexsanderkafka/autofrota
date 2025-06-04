package kafka.system.br.AutoFrota.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import kafka.system.br.AutoFrota.security.MercadoPagoSecurity;
import kafka.system.br.AutoFrota.service.PaymentService;

@RestController
@RequestMapping("/mercadopago/webhook")
public class MercadoPagoController {

    @Autowired
    private MercadoPagoSecurity mPagoSecurity;

    @Autowired
    private PaymentService paymentService;
    
    @PostMapping("/confirmed")
    public ResponseEntity<?> webhook(
        @RequestHeader("x-signature") String xSignature,
        @RequestHeader("x-request-id") String xRequestId,
        @RequestBody Map<String, Object> body,
        HttpServletRequest request
    ){
        mPagoSecurity.verifySignature(xSignature, xRequestId, body, request);

        System.out.println(body);

        paymentService.updatedPayment(body);

        return ResponseEntity.ok().build();
    }
}
