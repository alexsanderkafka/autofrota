package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.dto.AuthenticationDTO;
import kafka.system.br.AutoFrota.dto.MercadoPagoDTO;
import kafka.system.br.AutoFrota.dto.RegisterDTO;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.service.AuthService;
import kafka.system.br.AutoFrota.service.CompanyService;
import kafka.system.br.AutoFrota.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private CompanyService companyService;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody AuthenticationDTO dto){
        System.out.println(dto);

        return authService.signin(dto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO dto){
        System.out.println(dto);

        Company company = companyService.create(dto);

        //return 
        MercadoPagoDTO mercadoPagoDTO = paymentService.createCheckoutPro(dto, company);

        return ResponseEntity.ok().body(mercadoPagoDTO);
    }
}

