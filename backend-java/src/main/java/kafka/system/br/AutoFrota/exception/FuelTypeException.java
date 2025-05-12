package kafka.system.br.AutoFrota.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FuelTypeException extends RuntimeException {
    public FuelTypeException(String message) {
        super(message);
    }
}
