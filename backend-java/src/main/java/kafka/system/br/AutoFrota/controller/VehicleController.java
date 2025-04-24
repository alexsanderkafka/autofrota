package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping("/{companyId}/{vehicleStatus}")
    public ResponseEntity<?> getAllVehiclesByCompany(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "vehicleStatus") String vehicleStatus,
            @PathVariable(value = "companyId") String companyId
    ){
    
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var result = vehicleService.searchAllVehiclesByCompany(pageable, companyId, vehicleStatus);

        return ResponseEntity.ok(result);
    }


    @GetMapping("/{companyId}/recent")
    public ResponseEntity<?> searchRecentVehiclesByCompany(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "companyId") String companyId
    ){

        var vehicles = vehicleService.searchRecentVehiclesByCompany(companyId);

        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{companyId}/status")
    public ResponseEntity<?> countVehiclesByVehicleStatusByCompany(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "companyId") String companyId
    ){

        var countStatus = vehicleService.countByStatus(companyId);

        return ResponseEntity.ok(countStatus);
    }


    //Falta criar o endpoint POST para salvar um vehicle
}

