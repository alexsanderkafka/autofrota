package kafka.system.br.AutoFrota.dto;

import kafka.system.br.AutoFrota.model.Business;

import java.util.Date;

public record BusinessDTO(
        String email,
        String name,
        Date created,
        String cnpj,
        String phone
) {
    public BusinessDTO(String email, Business business) {
        this(
                email,
                business.getName(),
                business.getCreated(),
                business.getCnpj(),
                business.getPhone()
        );
    }
}
