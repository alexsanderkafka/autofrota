package kafka.system.br.AutoFrota.dto;

import kafka.system.br.AutoFrota.model.VehicleImage;

public record VehicleImageDTO(
        String url
) {
    
    public VehicleImageDTO(VehicleImage vehicleImage) {
        this(
            vehicleImage.getUrl()
        );
    }
}
