package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.FuelDTO;
import kafka.system.br.AutoFrota.model.Fuel;
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

    public FuelDTO getLastFuel(String companyId, Long vehicleId) {

        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista

        Fuel result = fuelRepository.findLastFuelByVehicleIdAndCompany(companyId, vehicleId);

        FuelDTO fuelDTO = new FuelDTO(result);

        return fuelDTO;
    }
}
