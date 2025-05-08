package kafka.system.br.AutoFrota.dto;

import jakarta.validation.constraints.NotNull;

public record DriverRegisterDTO(
    @NotNull
    String email,
    @NotNull
    String name,
    @NotNull
    String password,
    @NotNull
    String confirmPassword
) {
    
}
