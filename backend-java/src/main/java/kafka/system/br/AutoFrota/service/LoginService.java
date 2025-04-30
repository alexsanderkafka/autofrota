package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.AuthenticationDTO;
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
public class LoginService {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LoginRepository loginRepository;

    public ResponseEntity<?> signin(AuthenticationDTO data) {
        try{
            var email = data.email();
            var password = data.password();

            var currentLogin = loginRepository.findByCompanyEmail(email);

            if(currentLogin == null) throw new UsernameNotFoundException("Email " + email + " não encontrado!");

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

            return ResponseEntity.ok(tokenProvider.createAccessToken(email, currentLogin));
        }catch (UsernameNotFoundException e){
            throw e;
        }catch (Exception e){
            throw new BadCredentialsException("Email ou senha inválidos");
        }
    }
}

