package kafka.system.br.AutoFrota.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RegisterDTO(
    @NotBlank
    @NotEmpty
    String name,
    @NotBlank
    @Email
    String email,
    @NotBlank
    String pass,
    @NotBlank
    String confirmPass,
    @NotBlank
    String zipCode,
    @NotBlank
    String social,
    @NotBlank
    String address,
    @NotBlank
    String phone,
    @NotNull
    Long planId
) {
    
}
