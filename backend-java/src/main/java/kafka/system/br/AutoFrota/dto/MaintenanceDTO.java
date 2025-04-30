package kafka.system.br.AutoFrota.dto;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Null;
import kafka.system.br.AutoFrota.model.Maintenance;

import java.util.Date;

public record MaintenanceDTO(
        @Null
        Long id,
        @Null
        Date date,
        @Null
        boolean done,
        @Null
        String observation,
        @Null
        boolean scheduled,
        @Null
        @JsonProperty("vehicle_id")
        Long vehicleId
) {
    
    public MaintenanceDTO(Maintenance maintenance){
        this(
                maintenance.getId(),
                maintenance.getDate(),
                maintenance.isDone(),
                maintenance.getObservation(),
                maintenance.isScheduled(),
                maintenance.getVehicle().getId()
        );
    }

    public MaintenanceDTO() {
        this(
                null,
                null,
                false,
                null,
                false,
                null
        );
    }
}
