package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.dto.AuthenticationDTO;
import kafka.system.br.AutoFrota.dto.TokenDTO;
import kafka.system.br.AutoFrota.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody AuthenticationDTO dto){
        return loginService.signin(dto);
    }
}

