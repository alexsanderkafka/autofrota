package kafka.system.br.AutoFrota.dto;

import java.util.Date;

public record TokenDTO(
        Long id,
        String email,
        Boolean authenticated,
        Date created,
        Date expiration,
        String accessToken,
        String refreshToken
) {

    public TokenDTO {
    }
}

