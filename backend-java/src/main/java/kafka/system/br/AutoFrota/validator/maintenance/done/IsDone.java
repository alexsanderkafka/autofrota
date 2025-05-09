package kafka.system.br.AutoFrota.validator.maintenance.done;

import org.springframework.stereotype.Component;

import kafka.system.br.AutoFrota.dto.MaintenanceDoneRegisterDTO;
import kafka.system.br.AutoFrota.exception.MaintenanceRegisterException;

@Component
public class IsDone implements MaintenanceDoneValidator<MaintenanceDoneRegisterDTO>{

    @Override
    public void validator(MaintenanceDoneRegisterDTO dto) {
        if(!dto.maintenance().done()) throw new MaintenanceRegisterException("O campo done deve ser true");
    }
    
}
