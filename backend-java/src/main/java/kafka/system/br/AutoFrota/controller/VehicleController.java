package kafka.system.br.AutoFrota.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import kafka.system.br.AutoFrota.security.TokenProvider;
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

    @Autowired
    private TokenProvider tokenProvider;

    @GetMapping()
    public ResponseEntity<?> searchRecentVehicles(
            @RequestHeader("Authorization") String authorizationHeader
    ){

        String token = authorizationHeader.replace("Bearer ", "");
        DecodedJWT decodedToken = tokenProvider.decodedToken(token);

        var vehicles = vehicleService.searchRecentVehiclesByCompanyEmail(decodedToken.getSubject());

        return ResponseEntity.ok(vehicles);
    }

    /* 
    @GetMapping("/{id}")
    public ResponseEntity<?> getAllVehiclesByBusinessId(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @PathVariable(value = "id") Long id
    ){
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var result = vehicleService.getAllVehiclesByBusinessId(pageable, id);

        return ResponseEntity.ok(result);
    }*/

    /*
    @GetMapping("/{status}/{id}")
    public ResponseEntity<?> getAllVehiclesWithStatusMaintenanceByBusinessId(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @PathVariable(value = "id") Long id,
            @PathVariable(value = "status") String status
    ){
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var result = vehicleService.getAllVehiclesWithStatusMaintenance(pageable, id, status);

        return ResponseEntity.ok(result);
    }*/
}

