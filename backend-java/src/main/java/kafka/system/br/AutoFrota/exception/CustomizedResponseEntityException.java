package kafka.system.br.AutoFrota.exception;

import kafka.system.br.AutoFrota.dto.ExceptionDTO;
import kafka.system.br.AutoFrota.dto.ValidationExceptionDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @ExceptionHandler(InvalidEmailCode.class)
    public final ResponseEntity<ExceptionDTO> handleInvalidEmailCode(Exception ex, WebRequest request){
        ExceptionDTO exceptionResponse = new ExceptionDTO(new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public final ResponseEntity<ValidationExceptionDTO> handleValidationFields(MethodArgumentNotValidException ex, WebRequest request){
         List<String> fields = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        ValidationExceptionDTO exceptionResponse = new ValidationExceptionDTO(new Date(), "Validation failed", request.getDescription(false), fields);

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(VehicleNotFoundException.class)
    public final ResponseEntity<ExceptionDTO> handleVehicleNotFound(Exception ex, WebRequest request){
        ExceptionDTO exceptionResponse = new ExceptionDTO(new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MaintenanceRegisterException.class)
    public final ResponseEntity<ExceptionDTO> handleScheduledVehicle(Exception ex, WebRequest request){
        ExceptionDTO exceptionResponse = new ExceptionDTO(new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }


}
