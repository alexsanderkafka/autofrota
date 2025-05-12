package kafka.system.br.AutoFrota.validator.maintenance.scheduled;

import org.springframework.stereotype.Component;

import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.exception.MaintenanceRegisterException;

@Component
public class IsScheduled implements ScheduledMaintenanceValidator<MaintenanceDTO>{

    @Override
    public void validator(MaintenanceDTO dto) {
        if(dto.done()) throw new MaintenanceRegisterException("O campo done deve ser false");

        if(!dto.scheduled()) throw new MaintenanceRegisterException("O campo scheduled deve ser true");
    }
    
}
