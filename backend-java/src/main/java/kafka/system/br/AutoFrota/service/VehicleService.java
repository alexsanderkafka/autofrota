package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.FuelDTO;
import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.dto.VehicleDTO;
import kafka.system.br.AutoFrota.dto.VehicleStatusDTO;
import kafka.system.br.AutoFrota.model.Fuel;
import kafka.system.br.AutoFrota.model.Maintenance;
import kafka.system.br.AutoFrota.repository.FuelRepository;
import kafka.system.br.AutoFrota.repository.MaintenanceRepository;
import kafka.system.br.AutoFrota.repository.VehicleRepository;
import kafka.system.br.AutoFrota.utils.TypeVehicleStatusEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private PagedResourcesAssembler<VehicleDTO> pagedResourcesAssembler;

    @Autowired
    private FuelRepository fuelRepository;

    public Stream<VehicleDTO> searchRecentVehiclesByCompany(String userId){

        //Verificar se realmenter esse id existe

        Stream<VehicleDTO> currentVehicles = vehicleRepository.findRecentVehiclesByCompany(userId).stream().<VehicleDTO>map(VehicleDTO::new);

        return currentVehicles;
    }

    public VehicleStatusDTO countByStatus(String userId) {

        //Verificar se realmenter esse id existe

        VehicleStatusDTO result = vehicleRepository.findVehicleCountByStatus(userId);

        return result;
    }

    public PagedModel<EntityModel<VehicleDTO>> searchAllVehiclesByCompany(Pageable pageable, String userId, String status) {

        //Verificar se realmenter esse id existe
        //Verificar o status válido

        Page<VehicleDTO> result = vehicleRepository.findAllVehiclesByCompany(userId, status, pageable).map(VehicleDTO::new);


        return pagedResourcesAssembler.toModel(result);
    }

}


