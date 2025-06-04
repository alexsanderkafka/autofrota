package kafka.system.br.AutoFrota.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserNotPaidException extends RuntimeException {
     public UserNotPaidException(String message) {
        super(message);
    }
}
