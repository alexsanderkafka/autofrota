package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import kafka.system.br.AutoFrota.model.Fuel;

import java.util.Date;

public record FuelDTO(
        @Null
        Long id,
        @NotNull
        Double liters,
        @NotNull
        Double totalValue,
        @NotNull
        Integer km,
        @NotNull
        Date date,
        @NotNull
        @NotBlank
        String fuelType
) {


    public FuelDTO(Fuel fuel){
        this(
                fuel.getId(),
                fuel.getLiters(),
                fuel.getTotalValue(),
                fuel.getKm(),
                fuel.getDate(),
                fuel.getType()
        );
    }
}
