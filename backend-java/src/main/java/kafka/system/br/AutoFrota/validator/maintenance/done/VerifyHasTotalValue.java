package kafka.system.br.AutoFrota.validator.maintenance.done;

import org.springframework.stereotype.Component;

import kafka.system.br.AutoFrota.dto.MaintenanceDoneRegisterDTO;
import kafka.system.br.AutoFrota.exception.MaintenanceRegisterException;

@Component
public class VerifyHasTotalValue implements MaintenanceDoneValidator<MaintenanceDoneRegisterDTO>{

    @Override
    public void validator(MaintenanceDoneRegisterDTO dto) {
        
        if(dto.maintenance().totalValue() <= 0.0) throw new MaintenanceRegisterException("O campo totalValue deve ser maior que zero");
    }
    
}
