package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.CompanyDTO;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CompanyService implements UserDetailsService {

    @Autowired
    private LoginRepository authenticationRepository;

    @Autowired
    private CompanyRepository companyRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        var business = authenticationRepository.findByCompanyEmail(username);

        if(business != null){
            return business;
        }
        else{
            throw new UsernameNotFoundException("Username " + username + " not found");
        }
        //return null;
    }

    public CompanyDTO getBusinessById(Long id){
        //var login = authenticationRepository.findByBusinessId(id);

        var currentCompany = companyRepository.findById(id);


        return new CompanyDTO(currentCompany);
    }
}
