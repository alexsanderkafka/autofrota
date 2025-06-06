package kafka.system.br.AutoFrota.dto;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import kafka.system.br.AutoFrota.model.Maintenance;

import java.util.Date;

public record MaintenanceDTO(
        @Null
        Long id,
        @NotNull(message = "O campo date é obrigatório")
        Date date,
        @NotNull(message = "O campo done é obrigatório")
        Boolean done,
        @NotNull(message = "O campo observation é obrigatório")
        String observation,
        @NotNull(message = "O campo scheduled é obrigatório")
        Boolean scheduled,
        @NotNull(message = "O campo total totalValue é obrigatório")
        Double totalValue,
        @NotNull(message = "O campo vehicleId é obrigatório")
        Long vehicleId
) {
    
    public MaintenanceDTO(Maintenance maintenance){
        this(
                maintenance.getId(),
                maintenance.getDate(),
                maintenance.isDone(),
                maintenance.getObservation(),
                maintenance.isScheduled(),
                maintenance.getTotalValue(),
                maintenance.getVehicle().getId()
        );
    }
}
