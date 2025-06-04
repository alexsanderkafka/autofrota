package kafka.system.br.AutoFrota.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EntityExistException extends RuntimeException {
    public EntityExistException(String message) {
        super(message);
    }
}
