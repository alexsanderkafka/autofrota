package kafka.system.br.AutoFrota.dto;

import java.util.Date;
import java.util.List;


public record ValidationExceptionDTO(
    Date timestamp,
    String message,
    String detail,
    List<String> fields
) {
    public ValidationExceptionDTO(Date timestamp,String message, String detail, List<String> fields) {
        this.timestamp = timestamp;
        this.message = message;
        this.detail = detail;
        this.fields = fields;
    }

    
}
