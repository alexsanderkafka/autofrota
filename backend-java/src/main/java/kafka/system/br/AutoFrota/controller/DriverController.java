package kafka.system.br.AutoFrota.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import kafka.system.br.AutoFrota.dto.DriverRegisterDTO;
import kafka.system.br.AutoFrota.service.DriverService;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;
    

    @GetMapping("/{companyId}")
    public ResponseEntity<?> getAllDriversByCompanyId(
        @RequestParam(value = "page", defaultValue = "0") Integer page,
        @RequestParam(value = "size", defaultValue = "10") Integer size,
        @RequestParam(value = "direction", defaultValue = "asc") String direction,
        @PathVariable(value = "companyId") String companyId
    ) {

        var sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "id"));

        var drivers = driverService.searchAllDriversByCompanyId(companyId, pageable);

        return ResponseEntity.ok(drivers);
    }

    @PostMapping("/{companyId}")
    public ResponseEntity<?> saveDriverWithCompany(
        @PathVariable(value = "companyId") String companyId,
        @Valid @RequestBody(required = true) DriverRegisterDTO dto
    ) {

        driverService.save(companyId, dto);

        return ResponseEntity.created(null).build();
    }

    @DeleteMapping("/{companyId}/{driverId}")
    public ResponseEntity<?> deleteDriverByCompany(
        @PathVariable(value = "companyId") String companyId,
        @PathVariable(value = "driverId") Long driverId
    ) {

        driverService.deleteDriver(companyId, driverId);

        return ResponseEntity.noContent().build();
    }
}
