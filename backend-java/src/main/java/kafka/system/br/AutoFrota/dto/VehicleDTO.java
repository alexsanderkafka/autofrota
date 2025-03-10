package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import kafka.system.br.AutoFrota.model.*;

import java.util.List;
import java.util.stream.Stream;

public record VehicleDTO(
        String plate,
        String brand,
        String model,
        String year,
        @JsonProperty("image_perfil")
        String imagePerfil,
        @JsonProperty("vehicle_code")
        String vehicleCode,
        @JsonProperty("vehicle_characteristic")
        VehicleCharacteristic vehicleCharacteristic,
        @JsonProperty("external_image")
        ExternalImage externalImage,
        @JsonProperty("internal_image")
        InternalImage internalImage,
        Business business,
        @JsonProperty("maintenance")
        MaintenanceDTO maintenanceDTO,
        @JsonProperty("fuel")
        FuelDTO fuel
) {

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
    }
}

