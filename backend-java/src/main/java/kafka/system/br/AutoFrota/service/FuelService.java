package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.FuelDTO;
import kafka.system.br.AutoFrota.repository.FuelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

@Service
public class FuelService {

    @Autowired
    private FuelRepository fuelRepository;

    @Autowired
    private PagedResourcesAssembler<FuelDTO> pagedResourcesAssembler;

    public PagedModel<EntityModel<FuelDTO>> getAllFuelByVehicleId(Pageable pageable, Long id){
        Page<FuelDTO> fuel = fuelRepository.findAllFuelByVehicleId(id, pageable).map(FuelDTO::new);

        return pagedResourcesAssembler.toModel(fuel);
    }
}
