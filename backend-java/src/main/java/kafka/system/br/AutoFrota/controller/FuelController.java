package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.dto.DateFilterDTO;
import kafka.system.br.AutoFrota.service.FuelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/fuel")
@RestController
public class FuelController {

    @Autowired
    private FuelService service;

    @GetMapping("/{companyId}/{vehicleId}")
    public ResponseEntity<?> getAllFuelByVehicleIdAndCompany(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @PathVariable(value = "vehicleId") Long vehicleId,
            @PathVariable(value = "companyId") String companyId
    ){
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var result = service.getAllFuelByVehicleId(vehicleId, companyId, pageable);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{companyId}/{vehicleId}/last")
    public ResponseEntity<?> getLastFuelByVehicleId(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "companyId") String companyId,
            @PathVariable(value = "vehicleId") Long vehicleId
    ){
        var result = service.getLastFuel(companyId, vehicleId);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{companyId}/{vehicleId}/all/filter")
    public ResponseEntity<?> getAllDateFilterFuelByVehicleIdAndCompany(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @PathVariable(value = "vehicleId") Long vehicleId,
            @PathVariable(value = "companyId") String companyId,
            @RequestBody DateFilterDTO filter

    ){
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var result = service.getAllDateFilterFuelByVehicleId(vehicleId, companyId, filter, pageable);

        return ResponseEntity.ok(result);
    }

    



}
