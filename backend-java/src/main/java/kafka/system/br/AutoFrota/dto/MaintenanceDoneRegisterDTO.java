package kafka.system.br.AutoFrota.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record MaintenanceDoneRegisterDTO(
    @Valid
    MaintenanceDTO maintenance,
    @NotNull
    @NotEmpty   
    List<String> services
) {
    
}
