package kafka.system.br.AutoFrota.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import kafka.system.br.AutoFrota.dto.DriverDTO;
import kafka.system.br.AutoFrota.repository.DriverRepository;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private PagedResourcesAssembler<DriverDTO> pagedResourcesAssembler;
    
    public PagedModel<EntityModel<DriverDTO>> searchAllDriversByCompanyId(String companyId, Pageable pageable) {

        // Verificar se realmente esse id existe

        Page<DriverDTO> drivers = driverRepository.findAllByCompanyExternalId(companyId, pageable).map(DriverDTO::new);

        return pagedResourcesAssembler.toModel(drivers);
    }
}