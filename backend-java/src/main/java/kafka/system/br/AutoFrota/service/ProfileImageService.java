package kafka.system.br.AutoFrota.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kafka.system.br.AutoFrota.exception.NotFoundCompanyException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.model.ProfileImage;
import kafka.system.br.AutoFrota.repository.CompanyRepository;

@Service
public class ProfileImageService {

    @Autowired
    private CompanyRepository companyRepository;

    public void updateProfileImageByCompany(String companyId, String url) {
        Company company = companyRepository.findByExternalId(companyId);

        if(company == null) throw new NotFoundCompanyException("Company not found");

        ProfileImage profileImage = company.getProfileImage();

        profileImage.setUrl(url);

        companyRepository.save(company);
    }
    


}
