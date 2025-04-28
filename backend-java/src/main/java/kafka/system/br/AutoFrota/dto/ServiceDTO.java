package kafka.system.br.AutoFrota.dto;

import kafka.system.br.AutoFrota.model.Services;

public record ServiceDTO(
    Long id,
    String type,
    float price //price, que é o valor total vai para tabela maintenance
) {

    public ServiceDTO(Services service) {
        this(
            service.getId(),
            service.getType(),
            service.getTotalValue()
        );
    }

} 
    
