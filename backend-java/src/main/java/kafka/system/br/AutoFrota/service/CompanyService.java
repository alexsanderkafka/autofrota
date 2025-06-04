package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.CompanyDTO;
import kafka.system.br.AutoFrota.dto.RegisterDTO;
import kafka.system.br.AutoFrota.dto.UpdateCompanyDTO;
import kafka.system.br.AutoFrota.exception.EntityExistException;
import kafka.system.br.AutoFrota.exception.NotFoundEntityException;
import kafka.system.br.AutoFrota.exception.PasswordIsNotConfirmedException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.model.Login;
import kafka.system.br.AutoFrota.model.ProfileImage;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.LoginRepository;
import kafka.system.br.AutoFrota.repository.ProfileImageRepository;
import kafka.system.br.AutoFrota.security.PasswordEnconder;

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

    @Autowired
    private ProfileImageRepository profileImageRepository;


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

    public Company create(RegisterDTO dto) {
        
        Login login = authenticationRepository.findByCompanyEmail(dto.email());

        if(login != null) throw new EntityExistException("Esse email já está cadastrado");

        if(!dto.pass().equals(dto.confirmPass())) throw new PasswordIsNotConfirmedException("As senhas não conferem");

        String cryptoPass = PasswordEnconder.encode(dto.pass());

        Login currentLogin = new Login(dto.email(), cryptoPass, false);
        Login savedLogin = authenticationRepository.save(currentLogin);

        
        ProfileImage profileImage = new ProfileImage("https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/autofrota%2Fdriver.jpg?alt=media&token=33231db1-9f99-4ef6-9d19-31bac6dcea83");
        ProfileImage savedProfileImage = profileImageRepository.save(profileImage);


        Company currentCompany = new Company(savedLogin, savedProfileImage, dto.address(), dto.zipCode(), dto.phone(), dto.social(), dto.name());

        return companyRepository.save(currentCompany);
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

        if(company == null) throw new NotFoundEntityException("Company not found");

        company.setName(dto.name());
        company.setSocial(dto.social());
        company.setZipCode(dto.zipCode());
        company.setAddress(dto.address());
        company.setPhone(dto.phone());

        companyRepository.save(company);
    }
}
