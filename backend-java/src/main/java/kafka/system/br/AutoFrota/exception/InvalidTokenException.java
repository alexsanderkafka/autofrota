package kafka.system.br.AutoFrota.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import org.springframework.security.core.AuthenticationException;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidTokenException extends AuthenticationException {
    public InvalidTokenException(String ex) {
        super(ex);
    }
}
