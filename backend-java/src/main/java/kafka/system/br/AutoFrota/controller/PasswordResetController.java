package kafka.system.br.AutoFrota.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import kafka.system.br.AutoFrota.dto.CompanyDTO;
import kafka.system.br.AutoFrota.dto.PasswordResetDTO;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.service.CompanyService;
import kafka.system.br.AutoFrota.service.EmailService;
import kafka.system.br.AutoFrota.service.PasswordResetService;

@RestController
@RequestMapping("/reset")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private CompanyService companyService;

    @GetMapping("/{companyId}")
    public ResponseEntity<?> requestToChangePassword(
        @PathVariable(value = "companyId") String companyId
    ){
        CompanyDTO company = companyService.getBusinessById(companyId);
    
        String code = passwordResetService.generateAndStoreCode(companyId);

        String email = company.email();

        emailService.sendPasswordResetCode(email, code);

        //return new ResponseEntity<>(HttpStatus.OK);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{companyId}")
    public ResponseEntity<?> updatePassChangePassword(
        @PathVariable(value = "companyId") String companyId,
        @RequestBody() PasswordResetDTO dto
    ){

        passwordResetService.updatePassword(companyId, dto);

        return ResponseEntity.noContent().build();
    }
}

