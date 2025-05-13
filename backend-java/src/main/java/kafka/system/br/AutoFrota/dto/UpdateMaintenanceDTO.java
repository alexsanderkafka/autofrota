package kafka.system.br.AutoFrota.dto;

import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UpdateMaintenanceDTO(
    @NotNull
    Long id,
    @NotNull
    Date date,
    @NotNull
    Double totalValue,
    @NotNull
    @NotEmpty   
    List<String> services
) {
    
}
