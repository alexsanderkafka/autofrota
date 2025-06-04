package kafka.system.br.AutoFrota.dto;

import java.util.Optional;

import kafka.system.br.AutoFrota.model.Company;

public record CompanyDTO(
        String email,
        String name,
        String social,
        String zipCode,
        String address,
        String phone,
        String profileImage
) {
    public CompanyDTO(Company company) {
        this(
                company.getLogin().getEmail(),
                company.getName(),
                company.getSocial(),
                company.getZipCode(),
                company.getAddress(),
                company.getPhone(),
                company.getProfileImage().getUrl()
        );
    }
}
