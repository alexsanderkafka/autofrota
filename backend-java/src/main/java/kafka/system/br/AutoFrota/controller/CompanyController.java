package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.dto.UpdateCompanyDTO;
import kafka.system.br.AutoFrota.security.MercadoPagoSecurity;
import kafka.system.br.AutoFrota.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService service;

    @GetMapping("/{companyId}")
    private ResponseEntity<?> getBusinessById(@PathVariable(value = "companyId") String id){
        var currentBusiness = service.getBusinessById(id);

        return ResponseEntity.ok(currentBusiness);
    }

    @PutMapping("/{companyId}")
    private ResponseEntity<?> updateInfosCompany(
        @PathVariable(value = "companyId") String id,
        @Valid() @RequestBody() UpdateCompanyDTO dto
    ){
        
        service.updateInfosCompany(id, dto);

        //Posso voltar o item que foi atualizado
        return ResponseEntity.noContent().build();
    }
}
