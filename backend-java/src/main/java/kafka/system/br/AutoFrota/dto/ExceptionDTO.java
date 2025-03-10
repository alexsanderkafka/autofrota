package kafka.system.br.AutoFrota.dto;

import java.util.Date;

public record ExceptionDTO(
        Date timestamp,
        String message,
        String detail
) {
    public ExceptionDTO(Date timestamp, String message, String detail) {
        this.timestamp = timestamp;
        this.message = message;
        this.detail = detail;
    }
}
