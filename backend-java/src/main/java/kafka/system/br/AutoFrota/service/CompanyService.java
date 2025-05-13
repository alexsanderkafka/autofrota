package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.CompanyDTO;
import kafka.system.br.AutoFrota.dto.UpdateCompanyDTO;
import kafka.system.br.AutoFrota.exception.NotFoundCompanyException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

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

    public CompanyDTO getBusinessById(String id){
        //var login = authenticationRepository.findByBusinessId(id);

        Company currentCompany = companyRepository.findByExternalId(id);

        //verificar se a company existe

        CompanyDTO dto = new CompanyDTO(currentCompany);
        

        return dto;
    }

    public void updateInfosCompany(String id, UpdateCompanyDTO dto) {
        
        //Verificar cpf e cnpj
        //Verificar se tem permissão
        //Verificar a questão do cpf e cnpj null
        
        Company company = companyRepository.findByExternalId(id);

        if(company == null) throw new NotFoundCompanyException("Company not found");

        company.setName(dto.name());
        company.setCnpj(dto.cnpj());
        company.setCpf(dto.cpf());
        company.setZipCode(dto.zipCode());
        company.setAddress(dto.address());
        company.setPhone(dto.phone());

        companyRepository.save(company);
    }
}
