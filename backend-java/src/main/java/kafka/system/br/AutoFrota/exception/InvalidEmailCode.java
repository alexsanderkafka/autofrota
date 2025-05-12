package kafka.system.br.AutoFrota.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidEmailCode extends RuntimeException{
    public InvalidEmailCode(String message) {
        super(message);
    }
}
