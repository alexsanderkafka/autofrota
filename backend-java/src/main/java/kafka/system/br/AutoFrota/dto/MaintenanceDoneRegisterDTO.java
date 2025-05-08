package kafka.system.br.AutoFrota.dto;

import java.util.List;

public record MaintenanceDoneRegisterDTO(
    MaintenanceDTO maintenance,
    List<String> services
) {
    
}
