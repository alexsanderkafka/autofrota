package kafka.system.br.AutoFrota.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DriverRegisterDTO(
    @NotNull
    @NotBlank
    @Pattern(
        regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$",
        message = "E-mail com formato inválido"
    )
    String email,
    @NotNull
    @NotBlank
    String name,
    @NotNull
    @NotBlank
    String password,
    @NotNull
    @NotBlank
    String confirmPassword
) {
    
}
