package kafka.system.br.AutoFrota.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Null;

public interface VehicleStatusDTO {
    Long getMaintenance();
    Long getActive();
    Long getAlert();
    Long getUsage();
}
