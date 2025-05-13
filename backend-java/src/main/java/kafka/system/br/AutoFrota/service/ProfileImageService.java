package kafka.system.br.AutoFrota.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kafka.system.br.AutoFrota.exception.NotFoundEntityException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.model.Driver;
import kafka.system.br.AutoFrota.model.ProfileImage;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.DriverRepository;
import kafka.system.br.AutoFrota.repository.ProfileImageRepository;

@Service
public class ProfileImageService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private ProfileImageRepository profileImageRepository;

    public void updateProfileImageByCompany(String companyId, String url) {
        Company company = companyRepository.findByExternalId(companyId);

        if(company == null) throw new NotFoundEntityException("Company not found");

        ProfileImage profileImage = company.getProfileImage();

        profileImage.setUrl(url);

        profileImageRepository.save(profileImage);
    }

    public void updateProfileImageByDriver(Long driverId, String url) {

        //Resolver o problema de imagem padrão do motorista

        Driver driver = driverRepository.findById(driverId).orElseThrow(() -> new NotFoundEntityException("Driver not found"));

        ProfileImage profileImage = driver.getProfileImage();

        profileImage.setUrl(url);

        profileImageRepository.save(profileImage);
    }
    


}
