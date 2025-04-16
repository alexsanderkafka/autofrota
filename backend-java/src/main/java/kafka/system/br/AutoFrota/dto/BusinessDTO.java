package kafka.system.br.AutoFrota.dto;

import kafka.system.br.AutoFrota.model.Company;

import java.util.Date;

public record BusinessDTO(
        String email,
        String name,
        Date created,
        String cnpj,
        String phone
) {
    public BusinessDTO(String email, Company business) {
        this(
                email,
                business.getName(),
                business.getCreated(),
                business.getCnpj(),
                business.getPhone()
        );
    }
}
