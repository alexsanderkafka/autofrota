package kafka.system.br.AutoFrota.validator.maintenance.scheduled;

import org.springframework.stereotype.Component;

import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.exception.MaintenanceRegisterException;

@Component
public class VerifyTotalValue implements ScheduledMaintenanceValidator<MaintenanceDTO>{

    @Override
    public void validator(MaintenanceDTO dto) {
        if(dto.totalValue() > 0.0) throw new MaintenanceRegisterException("O campo totalValue deve ser 0.0");
    }
}
