package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.AuthenticationDTO;
import kafka.system.br.AutoFrota.dto.RegisterDTO;
import kafka.system.br.AutoFrota.exception.UserNotPaidException;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
//import kafka.system.br.AutoFrota.dto.TokenDTO;
import kafka.system.br.AutoFrota.repository.LoginRepository;
import kafka.system.br.AutoFrota.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public ResponseEntity<?> signin(AuthenticationDTO data) {
        try{
            //Verificar se o usuário realmente pagou
            var email = data.email();
            var password = data.password();

            var currentLogin = loginRepository.findByCompanyEmail(email);

            if(currentLogin == null) throw new UsernameNotFoundException("Email " + email + " não encontrado!");

            if(!currentLogin.isActive()) throw new UserNotPaidException("Pagamento não realizado");

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

            return ResponseEntity.ok(tokenProvider.createAccessToken(email, currentLogin));
        }catch (UsernameNotFoundException e){
            throw e;
        }catch (UserNotPaidException e){
            throw e;
        }
        catch (Exception e){
            throw new BadCredentialsException("Email ou senha inválidos");
        }
    }

    public ResponseEntity<?> register(RegisterDTO dto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }
}

