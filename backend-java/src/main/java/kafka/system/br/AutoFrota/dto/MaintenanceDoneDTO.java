package kafka.system.br.AutoFrota.dto;

import java.util.List;

import kafka.system.br.AutoFrota.model.Maintenance;

public record MaintenanceDoneDTO(
    MaintenanceDTO maintenance,
    List<ServiceDTO> services
) {

    public MaintenanceDoneDTO(Maintenance maintenance, List<ServiceDTO> services) {
        this(
            new MaintenanceDTO(maintenance),
            services
        );
    }

    public MaintenanceDoneDTO(Maintenance maintenance) {
        this(
            new MaintenanceDTO(maintenance),
            maintenance.getServices().stream().map(ServiceDTO::new).toList()
        );
    }

}
