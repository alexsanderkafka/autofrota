package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Null;
import kafka.system.br.AutoFrota.model.Vehicle;
import kafka.system.br.AutoFrota.model.VehicleImage;
import kafka.system.br.AutoFrota.model.VehicleStatus;

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
        Long km,
        @Null
        String category,
        @Null
        boolean active,
        @Null
        @JsonProperty("vehicleImage")
        VehicleImageDTO vehicleImageId,
        @Null
        @JsonProperty("companyId")
        String companyId,
        @Null
        @JsonProperty("vehicleStatus")
        String vehicleStatusId
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
                new VehicleImageDTO(vehicle.getVehicleImage()),
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

