package kafka.system.br.AutoFrota.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class MercadoPagoException extends RuntimeException{
    public MercadoPagoException(String message) {
        super(message);
    }
}
