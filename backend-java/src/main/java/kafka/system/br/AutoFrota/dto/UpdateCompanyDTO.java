package kafka.system.br.AutoFrota.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

public record UpdateCompanyDTO(
    @NotBlank
    @NotNull
    String name,
    @NotBlank
    @NotNull
    String social,
    @NotBlank
    @NotNull
    String zipCode,
    @NotBlank
    @NotNull
    String address,
    @NotBlank
    @NotNull
    String phone
) {
    
}
