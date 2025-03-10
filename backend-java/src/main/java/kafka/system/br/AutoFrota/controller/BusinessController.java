package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/business")
public class BusinessController {

    @Autowired
    private BusinessService service;

    @GetMapping("/{businessId}")
    private ResponseEntity<?> getBusinessById(@PathVariable(value = "businessId") Long id){
        var currentBusiness = service.getBusinessById(id);

        return ResponseEntity.ok(currentBusiness);
    }
}
