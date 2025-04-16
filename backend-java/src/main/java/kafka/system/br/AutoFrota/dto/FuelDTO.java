package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Null;
import kafka.system.br.AutoFrota.model.Fuel;

import java.util.Date;

public record FuelDTO(
        @Null
        Long id,
        @Null
        float liters,
        @Null
        @JsonProperty("total_value")
        float totalValue,
        @Null
        Integer km,
        @Null
        Date date,
        @Null
        @JsonProperty("fuel_type")
        String fuelType,
        @Null
        @JsonProperty("vehicle_id")
        Long vehicleId
) {


    public FuelDTO(Fuel fuel){
        this(
                fuel.getId(),
                fuel.getLiters(),
                fuel.getTotalValue(),
                fuel.getKm(),
                fuel.getDate(),
                fuel.getType(),
                fuel.getVehicle().getId()
        );
    }
    
    public FuelDTO() {
        this(
              null,
              0,
              0,
              0,
              null,
              null, null
        );
    }
}
