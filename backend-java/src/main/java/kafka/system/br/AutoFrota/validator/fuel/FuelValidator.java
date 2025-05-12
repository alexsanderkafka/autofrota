package kafka.system.br.AutoFrota.validator.fuel;

public interface FuelValidator<FuelDTO> {
    void validator(FuelDTO dto);
}
