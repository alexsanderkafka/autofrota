package kafka.system.br.AutoFrota.dto;

import kafka.system.br.AutoFrota.model.Vehicle;

public record VehicleExpenseDTO(
    Vehicle vehicle,
    Double expense
) {
    
}
