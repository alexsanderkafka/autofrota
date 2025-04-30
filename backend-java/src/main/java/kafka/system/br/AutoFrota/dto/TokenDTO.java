package kafka.system.br.AutoFrota.dto;

import java.util.Date;
import java.util.UUID;

public record TokenDTO(
        String externalId,
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

