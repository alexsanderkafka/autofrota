package kafka.system.br.AutoFrota.dto;

import kafka.system.br.AutoFrota.model.Services;

import jakarta.validation.constraints.Null;

public record ServiceDTO(
    @Null
    Long id,
    @Null
    String type
    //price, que é o valor total vai para tabela maintenance
) {

    public ServiceDTO(Services service) {
        this(
            service.getId(),
            service.getType()
        );
    }

} 
    
