package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Null;
import kafka.system.br.AutoFrota.model.Vehicle;

//import kafka.system.br.AutoFrota.model.*;

//import java.util.List;
//import java.util.stream.Stream;

public record VehicleDTO(
        @Null
        Long id,
        @Null
        String plate,
        @Null
        String brand,
        @Null
        String model,
        @Null
        String typeFuel,
        @Null
        String km,
        @Null
        String category,
        @Null
        boolean activate,
        @Null
        @JsonProperty("vehicle_image_id")
        Long vehicleImageId,
        @Null
        @JsonProperty("company_id")
        Long companyId,
        @Null
        @JsonProperty("vehicle_status_id")
        Long vehicleStatusId
) {


    public VehicleDTO(Vehicle vehicle){
        this(
                vehicle.getId(),
                vehicle.getPlate(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getTypeFuel(),
                vehicle.getKm(),
                vehicle.getCategory(),
                vehicle.isActivate(),
                vehicle.getVehicleImage().getId(),
                vehicle.getCompany().getId(),
                vehicle.getVehicleStatus().getId()
        );
    }


    /*
    public VehicleDTO(VehicleIdentification vehicle, MaintenanceDTO maintenanceDto, FuelDTO fuelDto){
        this(
                vehicle.getPlate(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getYear(),
                vehicle.getImagePerfil(),
                vehicle.getVehicleCode(),
                vehicle.getCharacteristic(),
                vehicle.getExternalImage(),
                vehicle.getInternalImage(),
                vehicle.getBusiness(),
                maintenanceDto,
                fuelDto
        );
    }*/
}

