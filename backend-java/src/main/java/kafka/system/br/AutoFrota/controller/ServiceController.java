package kafka.system.br.AutoFrota.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kafka.system.br.AutoFrota.service.ServicesService;

@RestController
@RequestMapping("/service")
public class ServiceController {
    

    @Autowired
    private ServicesService service;
}
