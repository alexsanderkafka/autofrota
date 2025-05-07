package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.DateFilterDTO;
import kafka.system.br.AutoFrota.dto.FuelDTO;
import kafka.system.br.AutoFrota.dto.VehicleDTO;
import kafka.system.br.AutoFrota.exception.FuelNotFoundException;
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

    public PagedModel<EntityModel<FuelDTO>> getAllFuelByVehicleId(Long vehicleId, String companyId, Pageable pageable) {
        
        //Verificar vehicle id
        //Verificar retorno null

        Page<FuelDTO> result = fuelRepository.findAllFuelByVehicleIdAndCompany(vehicleId, companyId, pageable).map(FuelDTO::new);

        return pagedResourcesAssembler.toModel(result);        
    }

    public FuelDTO getLastFuel(String companyId, Long vehicleId) {

        //Verificar se realmenter esse id existe
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista

        Fuel result = fuelRepository.findLastFuelByVehicleIdAndCompany(companyId, vehicleId);

        if(result == null) throw new FuelNotFoundException("Fuel not found for vehicle id: " + vehicleId);

        FuelDTO fuelDTO = new FuelDTO(result);

        return fuelDTO;
    }

    public PagedModel<EntityModel<FuelDTO>> getAllDateFilterFuelByVehicleId(Long vehicleId, String companyId, DateFilterDTO filter, Pageable pageable) {
        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista

        Page<FuelDTO> result = fuelRepository.findAllDateFilterFuelByVehicleIdAndCompany(vehicleId, companyId, filter.startDate(), filter.endDate(), pageable).map(FuelDTO::new);

        return pagedResourcesAssembler.toModel(result);        

    }

    
}
