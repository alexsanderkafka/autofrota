package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/maintenance")
@RestController
public class MaintenanceController {

    @Autowired
    private MaintenanceService service;

    @GetMapping("/{companyId}/{vehicleId}/scheduled")
    public ResponseEntity<?> getScheduledMaintenanceByVehicleId(
            @PathVariable(value = "companyId") String companyId,
            @PathVariable(value = "vehicleId") Long vehicleId
    ){
        var result = service.getScheduledMaintenance(companyId, vehicleId);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{companyId}/{vehicleId}/last")
    public ResponseEntity<?> getLastMaintenanceByVehicleId(
            @PathVariable(value = "companyId") String companyId,
            @PathVariable(value = "vehicleId") Long vehicleId
    ){
        var result = service.getLastMaintenance(companyId, vehicleId);

        return ResponseEntity.ok(result);
    }


    /*
    @GetMapping("/{companyId}/{vehicleId}/last")
    public ResponseEntity<?> getScheduledMaintenanceByVehicleId(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "companyId") String companyId,
            @PathVariable(value = "vehicleId") Long vehicleId
    ){
        var result = service.getScheduledMaintenance(companyId, vehicleId);

        return ResponseEntity.ok(result);
    }*/

    /*

    @GetMapping("/{vehicleId}")
    public ResponseEntity<?> getAllMaintenanceByVehicleId(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @PathVariable(value = "vehicleId") Long id
    ){
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var result = service.getAllMaintenanceByVehicleId(pageable, id);

        return ResponseEntity.ok(result);
    }*/

}
