package kafka.system.br.AutoFrota.validator.fuel;

import org.springframework.stereotype.Component;

import kafka.system.br.AutoFrota.dto.FuelDTO;
import kafka.system.br.AutoFrota.exception.FuelTypeException;
import kafka.system.br.AutoFrota.utils.TypeFuelEnum;

@Component
public class VerifyTypeFuel implements FuelValidator<FuelDTO>{

    @Override
    public void validator(FuelDTO dto) {
        try {
            TypeFuelEnum.valueOf(dto.fuelType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new FuelTypeException("Tipo de combustível inválido");
        }

    }
    
}
