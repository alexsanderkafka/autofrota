package kafka.system.br.AutoFrota.validator.password;

public interface PasswordValidator<PasswordResetDTO> {
    void validator(PasswordResetDTO passwordResetDTO);
}
