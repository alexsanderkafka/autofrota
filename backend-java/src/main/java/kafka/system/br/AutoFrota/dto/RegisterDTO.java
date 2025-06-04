package kafka.system.br.AutoFrota.dto;

public record RegisterDTO(
    String name,
    String email,
    String pass,
    String confirmPass,
    String zipCode,
    String social,
    String address,
    String phone,
    Long planId
) {
    
}
