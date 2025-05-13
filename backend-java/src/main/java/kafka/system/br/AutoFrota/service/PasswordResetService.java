package kafka.system.br.AutoFrota.service;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import kafka.system.br.AutoFrota.dto.PasswordResetDTO;
import kafka.system.br.AutoFrota.exception.InvalidEmailCode;
import kafka.system.br.AutoFrota.exception.NotFoundEntityException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.LoginRepository;
import kafka.system.br.AutoFrota.security.PasswordEnconder;
import kafka.system.br.AutoFrota.utils.VerificationCodeGenerator;
import kafka.system.br.AutoFrota.validator.password.PasswordValidator;

@Service
public class PasswordResetService {

    private static final long RESET_CODE_EXPIRATION_MS = 15; 

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private List<PasswordValidator<PasswordResetDTO>> passwordValidators;

    public String generateAndStoreCode(String companyId){

        Company company = companyRepository.findByExternalId(companyId);

        if(company == null) throw new NotFoundEntityException("Company not found");

        String code = VerificationCodeGenerator.generateCode();
        String key = buildKey(companyId);

        //Armazena o código no redis
        redisTemplate.opsForValue().set(key, code, RESET_CODE_EXPIRATION_MS, TimeUnit.HOURS);

        return code;
    }

    public void updatePassword(String companyId, PasswordResetDTO dto){
        passwordValidators.forEach(v -> v.validator(dto));

        Company company = companyRepository.findByExternalId(companyId);

        if(company == null) throw new NotFoundEntityException("Company not found");

        validationCode(companyId, dto.code());

        String cryptoPass = PasswordEnconder.encode(dto.newPassword());

        loginRepository.updatePasswordByCompany(companyId, cryptoPass);
    }

    public void validationCode(String companyId, String code){
        String key = buildKey(companyId);
        String storedCode = redisTemplate.opsForValue().get(key);

        if(storedCode == null) throw new InvalidEmailCode("Invalid code");

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

