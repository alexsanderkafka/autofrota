package kafka.system.br.AutoFrota.dto;

import java.util.Optional;

import kafka.system.br.AutoFrota.model.Company;

public record CompanyDTO(
        String email,
        String name,
        String cnpj,
        String phone
) {
    public CompanyDTO(Optional<Company> company) {
        this(
                company.get().getLogin().getEmail(),
                company.get().getName(),
                company.get().getCnpj(),
                company.get().getPhone()
        );
    }
}
