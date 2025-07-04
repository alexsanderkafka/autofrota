package kafka.system.br.AutoFrota.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import kafka.system.br.AutoFrota.dto.DriverDTO;
import kafka.system.br.AutoFrota.dto.DriverRegisterDTO;
import kafka.system.br.AutoFrota.exception.NotFoundEntityException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.model.Driver;
import kafka.system.br.AutoFrota.model.Login;
import kafka.system.br.AutoFrota.model.ProfileImage;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.DriverRepository;
import kafka.system.br.AutoFrota.repository.LoginRepository;
import kafka.system.br.AutoFrota.repository.ProfileImageRepository;
import kafka.system.br.AutoFrota.security.PasswordEnconder;
import kafka.system.br.AutoFrota.validator.driver.DriverValidator;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private PagedResourcesAssembler<DriverDTO> pagedResourcesAssembler;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private ProfileImageRepository profileImageRepository;

    @Autowired
    private List<DriverValidator<DriverRegisterDTO>> driverValidators;

    //Passar esse service para util
    @Autowired
    private FirebaseImageService firebaseImageService;
    
    public PagedModel<EntityModel<DriverDTO>> searchAllDriversByCompanyId(String companyId, Pageable pageable) {

        // Verificar se realmente esse id existe

        Page<DriverDTO> drivers = driverRepository.findAllByCompanyExternalId(companyId, pageable).map(DriverDTO::new);

        return pagedResourcesAssembler.toModel(drivers);
    }

    public void save(String companyId, DriverRegisterDTO dto){

        //Verificar se é um e-mail válido
        //Verificar se tem permissão para salvar um motorista

        String password = PasswordEnconder.encode(dto.password());

        Company company = companyRepository.findByExternalId(companyId);

        if(company == null) throw new NotFoundEntityException("Company not found");

        driverValidators.forEach(v -> v.validator(dto));

        Login login = new Login(
            dto.email(),
            password,
            true
        );


        Login savedLogin = loginRepository.save(login); //Verificar email já salvo e retornar algum error

        //ProfileImage profileImage = profileImageRepository.getReferenceById((long) 3);

        ProfileImage profileImage = new ProfileImage();
        profileImage.setUrl("https://firebasestorage.googleapis.com/v0/b/softpizza-3602d.appspot.com/o/autofrota%2FprofileImage%2Fdriver.jpg?alt=media&token=f7106ae0-6fd3-4d42-997d-b897cdcbd614");

        Driver driver = new Driver(
            dto.name(),
            company,
            profileImage,
            savedLogin
        );

        driverRepository.save(driver);
    }

    public void deleteDriver(String companyId, Long driverId) {

        //Verificar a questão da imagem padrão

        Driver driver = driverRepository.findDriverByCompanyExternalIdAndId(companyId, driverId);

        if(driver == null) throw new NotFoundEntityException("Driver not found");

        firebaseImageService.deleteImage(driver.getProfileImage().getUrl());

        driverRepository.delete(driver);
    }
}