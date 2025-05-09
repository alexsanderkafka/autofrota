package kafka.system.br.AutoFrota.validator.maintenance.done;

public interface MaintenanceDoneValidator<MaintenanceDoneRegisterDTO> {
    void validator(MaintenanceDoneRegisterDTO dto);
}
