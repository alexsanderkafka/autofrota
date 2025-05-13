package kafka.system.br.AutoFrota.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateVehicleDTO(
    @NotNull
    Long id,
    @NotBlank
    @NotNull
    String vehicleStatus
) {
    
}
