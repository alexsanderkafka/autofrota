package kafka.system.br.AutoFrota.controller;

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

    @GetMapping("/{vehicleId}")
    public ResponseEntity<?> getAllFuelByVehicleId(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @PathVariable(value = "vehicleId") Long id
    ){
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var result = service.getAllFuelByVehicleId(pageable, id);

        return ResponseEntity.ok(result);
    }

}
