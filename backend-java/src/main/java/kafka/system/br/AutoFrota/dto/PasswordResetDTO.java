package kafka.system.br.AutoFrota.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PasswordResetDTO(
    @NotNull
    @NotBlank
    String newPassword,
    @NotNull
    @NotBlank
    String confirmNewPassword,
    @NotNull
    @NotBlank
    String code
) {
    
}
