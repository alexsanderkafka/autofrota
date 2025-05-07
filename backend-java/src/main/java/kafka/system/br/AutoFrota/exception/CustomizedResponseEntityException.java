package kafka.system.br.AutoFrota.exception;

import kafka.system.br.AutoFrota.dto.ExceptionDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
@RestController
public class CustomizedResponseEntityException {

    @ExceptionHandler(InvalidTokenException.class)
    public final ResponseEntity<ExceptionDTO> handleInvalidJwtAuthenticationExceptions(Exception ex, WebRequest request){

        ExceptionDTO exceptionResponse = new ExceptionDTO (new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(exceptionResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public final ResponseEntity<ExceptionDTO> handleInvalidPasswordOrEmail(Exception ex, WebRequest request){

        ExceptionDTO exceptionResponse = new ExceptionDTO(new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(exceptionResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public final ResponseEntity<ExceptionDTO> handleNotFoundEmail(Exception ex, WebRequest request){

        ExceptionDTO exceptionResponse = new ExceptionDTO(new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FuelNotFoundException.class)
    public final ResponseEntity<ExceptionDTO> handleLastFuelNotFound(Exception ex, WebRequest request){
        ExceptionDTO exceptionResponse = new ExceptionDTO(new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MaintenanceNotFoundException.class)
    public final ResponseEntity<ExceptionDTO> handleLastMaintenanceNotFound(Exception ex, WebRequest request){
        ExceptionDTO exceptionResponse = new ExceptionDTO(new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }


}
