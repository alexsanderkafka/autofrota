package kafka.system.br.AutoFrota.controller;

import kafka.system.br.AutoFrota.dto.UpdateVehicleDTO;
import kafka.system.br.AutoFrota.dto.VehicleDTO;
import kafka.system.br.AutoFrota.service.FirebaseImageService;
import kafka.system.br.AutoFrota.service.VehicleService;

import java.io.IOException;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private FirebaseImageService firebaseImageService;

    @Autowired
    private ObjectMapper objectMapper;

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

        System.out.println("Batendo no all vehicles by company");

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

    @GetMapping("/{companyId}/{vehicleId}/infos")
    public ResponseEntity<?> getInfoVehicleByVehicleId(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable(value = "companyId") String companyId,
            @PathVariable(value = "vehicleId") Long vehicleId
    ){

        var vehicle = vehicleService.getInfoVehicle(companyId,vehicleId);

        return ResponseEntity.ok(vehicle);
    }

    @PostMapping(value = "/{companyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveVehicleWithCompany(
        @PathVariable(value = "companyId") String companyId,
        @RequestParam(value = "file") MultipartFile file,   
        @RequestParam(value = "form") String form
    ){

        System.out.println("Storing file to disk");

        String path = "autofrota/vehicles/";
        var url = firebaseImageService.uploadImageToStorage(file, companyId, path);

        try{
            VehicleDTO dto = objectMapper.readValue(form, VehicleDTO.class);
            
            vehicleService.save(url, companyId, dto);

            //System.out.println(dto);

            return ResponseEntity.created(null).build();
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erro ao processar dados.");
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateVehicleStatus(
            @Valid @RequestBody UpdateVehicleDTO dto
    ){

        vehicleService.updateVehicleStatus(dto);

        //Posso voltar o item que foi atualizado
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{companyId}/{vehicleId}")
    public ResponseEntity<?> deleteVehicleByCompany(
        @PathVariable(value = "companyId") String companyId,
        @PathVariable(value = "vehicleId") Long vehicleId
    ) {

        vehicleService.deleteVehicle(companyId, vehicleId);

        return ResponseEntity.noContent().build();
    }
    
}

