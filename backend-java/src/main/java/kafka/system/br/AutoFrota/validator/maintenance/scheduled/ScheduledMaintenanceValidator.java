package kafka.system.br.AutoFrota.validator.maintenance.scheduled;

public interface ScheduledMaintenanceValidator<MaintenanceDTO> {
    void validator(MaintenanceDTO dto);
}
