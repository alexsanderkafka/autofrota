package kafka.system.br.AutoFrota.dto;

import java.util.List;

import kafka.system.br.AutoFrota.model.Maintenance;

public record ScheduledMaintenanceDTO(
    MaintenanceDTO maintenance,
    List<ServiceDTO> services
) {

    public ScheduledMaintenanceDTO(Maintenance maintenance, List<ServiceDTO> services) {
        this(
            new MaintenanceDTO(maintenance),
            services
        );
    }

}
