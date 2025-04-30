package kafka.system.br.AutoFrota.dto;

import kafka.system.br.AutoFrota.model.Driver;

public record DriverDTO(
    Long id,
    String name,
    String email
) {
    
    public DriverDTO(Driver driver) {
        this(
            driver.getId(),
            driver.getName(),
            driver.getLogin().getEmail()
        );
    }

}
