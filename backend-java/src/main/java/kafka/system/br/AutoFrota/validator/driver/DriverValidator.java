package kafka.system.br.AutoFrota.validator.driver;

public interface DriverValidator<DriverRegisterDTO> {
    void validator(DriverRegisterDTO dto);
}
