package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Null;
import kafka.system.br.AutoFrota.model.Vehicle;
import kafka.system.br.AutoFrota.model.VehicleImage;
import kafka.system.br.AutoFrota.model.VehicleStatus;

//import kafka.system.br.AutoFrota.model.*;

//import java.util.List;
//import java.util.stream.Stream;

@JsonInclude(JsonInclude.Include.NON_NULL)
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
        Long km,
        @Null
        String category,
        @Null
        boolean active,
        @Null
        String vehicleImage,
        @Null
        String companyId,
        @Null
        String vehicleStatus
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
                vehicle.isActive(),
                vehicle.getVehicleImage().getUrl(),
                vehicle.getCompany().getExternalId(),
                vehicle.getVehicleStatus().getType()
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

