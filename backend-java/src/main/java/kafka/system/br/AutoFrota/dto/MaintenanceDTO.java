package kafka.system.br.AutoFrota.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import kafka.system.br.AutoFrota.model.Maintenance;

import java.util.Date;

public record MaintenanceDTO(
        Long id,
        @JsonProperty("latest_maintenance")
        Date latestMaintenance,
        @JsonProperty("next_maintenance")
        Date nextMaintenance,
        @JsonProperty("date_maintenance")
        Date dateMaintenance,
        String observation,
        String status
) {
    public MaintenanceDTO(Maintenance maintenance) {
        this(
                maintenance.getId(),
                maintenance.getLatestMaintenance(),
                maintenance.getDateNextMaintenance(),
                maintenance.getDateMaintenance(),
                maintenance.getObservation(),
                maintenance.getStatus()
        );
    }

    public MaintenanceDTO() {
        this(
                null,
                null,
                null,
                null,
                null,
                null
        );
    }
}
