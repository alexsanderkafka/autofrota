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

    @GetMapping("/{userId}/{vehicleStatus}")
    public ResponseEntity<?> getAllVehiclesByCompany(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "vehicleStatus") String vehicleStatus,
            @PathVariable(value = "userId") String userId
    ){
    
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var result = vehicleService.searchAllVehiclesByCompany(pageable, userId, vehicleStatus);

        return ResponseEntity.ok(result);
    }


    @GetMapping("/{userId}/recent")
    public ResponseEntity<?> searchRecentVehiclesByCompany(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "userId") String userId
    ){

        var vehicles = vehicleService.searchRecentVehiclesByCompany(userId);

        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{userId}/status")
    public ResponseEntity<?> countVehiclesByVehicleStatusByCompany(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "userId") String userId
    ){

        var countStatus = vehicleService.countByStatus(userId);

        return ResponseEntity.ok(countStatus);
    }


    //Falta criar o endpoint POST para salvar um vehicle
}

