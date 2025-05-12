package kafka.system.br.AutoFrota.validator.password;

import org.springframework.stereotype.Component;

import kafka.system.br.AutoFrota.dto.PasswordResetDTO;
import kafka.system.br.AutoFrota.exception.PasswordIsNotConfirmedException;

@Component
public class ConfirmNewPassword implements PasswordValidator<PasswordResetDTO>{

    @Override
    public void validator(PasswordResetDTO dto) {
        if(!dto.newPassword().equals(dto.confirmNewPassword())) throw new PasswordIsNotConfirmedException("As senhas não conferem");
    }
    
}
