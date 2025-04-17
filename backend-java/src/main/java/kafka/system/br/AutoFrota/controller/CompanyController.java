package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService service;

    @GetMapping("/{companyId}")
    private ResponseEntity<?> getBusinessById(@PathVariable(value = "companyId") Long id){
        var currentBusiness = service.getBusinessById(id);

        return ResponseEntity.ok(currentBusiness);
    }
}
