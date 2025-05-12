package kafka.system.br.AutoFrota.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PasswordIsNotConfirmedException extends RuntimeException{
    public PasswordIsNotConfirmedException(String message) {
        super(message);
    }
}
