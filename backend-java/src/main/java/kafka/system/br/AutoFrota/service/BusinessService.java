package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.BusinessDTO;
import kafka.system.br.AutoFrota.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BusinessService implements UserDetailsService {

    @Autowired
    private AuthenticationRepository authenticationRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        var business = authenticationRepository.findByBusinessEmail(username);

        if(business != null){
            return business;
        }
        else{
            throw new UsernameNotFoundException("Username " + username + " not found");
        }
        //return null;
    }

    public BusinessDTO getBusinessById(Long id){
        var authentication = authenticationRepository.findByBusinessId(id);

        return new BusinessDTO(authentication.getEmail(), authentication.getBusiness());
    }
}
