package kafka.system.br.AutoFrota.validator.maintenance.scheduled;

import java.util.Date;

import org.springframework.stereotype.Component;

import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.exception.MaintenanceRegisterException;

@Component
public class VerifyFutureDate implements ScheduledMaintenanceValidator<MaintenanceDTO>{

    @Override
    public void validator(MaintenanceDTO dto) {
        Date currentDate = new Date();

        if(dto.date().before(currentDate)) throw new MaintenanceRegisterException("A data deve ser maior que a data atual");
    }

}
