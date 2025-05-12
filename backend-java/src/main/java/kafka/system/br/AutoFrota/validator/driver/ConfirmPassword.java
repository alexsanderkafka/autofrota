package kafka.system.br.AutoFrota.validator.driver;

import org.springframework.stereotype.Component;

import kafka.system.br.AutoFrota.dto.DriverRegisterDTO;
import kafka.system.br.AutoFrota.exception.PasswordIsNotConfirmedException;

@Component
public class ConfirmPassword implements DriverValidator<DriverRegisterDTO>{

    @Override
    public void validator(DriverRegisterDTO dto) {
        if(!dto.password().equals(dto.confirmPassword())) throw new PasswordIsNotConfirmedException("As senhas não conferem");
    }
    
}
