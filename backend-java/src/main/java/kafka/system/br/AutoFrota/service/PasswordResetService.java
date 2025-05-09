package kafka.system.br.AutoFrota.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import kafka.system.br.AutoFrota.dto.PasswordResetDTO;
import kafka.system.br.AutoFrota.exception.InvalidEmailCode;
import kafka.system.br.AutoFrota.repository.LoginRepository;
import kafka.system.br.AutoFrota.security.PasswordEnconder;
import kafka.system.br.AutoFrota.utils.VerificationCodeGenerator;

@Service
public class PasswordResetService {

    private static final long RESET_CODE_EXPIRATION_MS = 15; 

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private LoginRepository loginRepository;

    public String generateAndStoreCode(String companyId){

        //Verificar se a company existe no sistema

        String code = VerificationCodeGenerator.generateCode();
        String key = buildKey(companyId);

        //Armazena o código no redis
        redisTemplate.opsForValue().set(key, code, RESET_CODE_EXPIRATION_MS, TimeUnit.HOURS);

        return code;
    }

    public void updatePassword(String companyId, PasswordResetDTO dto){

        //Verificar senhas
        //Verificar usuário
        //Verificar código de confirmação

        validationCode(companyId, dto.code());

        String cryptoPass = PasswordEnconder.encode(dto.newPassword());

        loginRepository.updatePasswordByCompany(companyId, cryptoPass);
    }

    public void validationCode(String companyId, String code){
        String key = buildKey(companyId);
        String storedCode = redisTemplate.opsForValue().get(key);

        if(storedCode == null) throw new InvalidEmailCode("Invalid code"); //voltar uma exception

        boolean validation = storedCode.equals(code);

        if(!validation) throw new InvalidEmailCode("Invalid code");
    }

    public void invalidateCode(String companyId){
        String key = buildKey(companyId);
        redisTemplate.delete(key);
    }

    private String buildKey(String companyId) {
        return "password-reset:" + companyId;
    }


}

