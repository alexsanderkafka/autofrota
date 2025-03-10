package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Null;
import kafka.system.br.AutoFrota.model.Fuel;

import java.util.Date;

public record FuelDTO(
        @Null
        Long id,
        @Null
        @JsonProperty("latest_fuel")
        Date latestFuel,
        @Null
        float litter,
        @Null
        float price,
        @Null
        String km,
        @Null
        @JsonProperty("fuel_type")
        String fuelType
) {
    public FuelDTO(Fuel fuel) {
        this(
                fuel.getId(),
                fuel.getLatestFuel(),
                fuel.getLitter(),
                fuel.getPrice(),
                fuel.getKm(),
                fuel.getFuelType()
        );
    }

    public FuelDTO() {
        this(
              null,
              null,
              0,
              0,
              null,
              null
        );
    }
}
