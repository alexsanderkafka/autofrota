package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.dto.ScheduledMaintenanceDTO;
import kafka.system.br.AutoFrota.dto.ServiceDTO;
import kafka.system.br.AutoFrota.model.Maintenance;
import kafka.system.br.AutoFrota.model.Services;
import kafka.system.br.AutoFrota.repository.MaintenanceRepository;
import kafka.system.br.AutoFrota.repository.ServiceRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private PagedResourcesAssembler<MaintenanceDTO> pagedResourcesAssembler;

    public MaintenanceDTO getScheduledMaintenance(String companyId, Long vehicleId) {
        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista

        Maintenance result = maintenanceRepository.findScheduledMaintenanceByVehicleIdAndCompany(companyId, vehicleId);

        MaintenanceDTO maintenanceDto = new MaintenanceDTO(result);

        return maintenanceDto;
    }

    public ScheduledMaintenanceDTO getLastMaintenance(String companyId, Long vehicleId) {
        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista

        
        Maintenance maintenance = maintenanceRepository.findLastMaintenanceByVehicleIdAndCompany(companyId, vehicleId);
        MaintenanceDTO maintenanceDTO = new MaintenanceDTO(maintenance);

        
        List<Services> services = serviceRepository.findAllByMaintenanceId(maintenance.getId());
        List<ServiceDTO> servicesDto = services.stream().map(ServiceDTO::new).toList();

        ScheduledMaintenanceDTO scheduledMaintenanceDto = new ScheduledMaintenanceDTO(maintenanceDTO, servicesDto);

        return scheduledMaintenanceDto;
    }

    /*
    public MaintenanceDTO getScheduledMaintenance(String companyId, Long vehicleId) {
        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista

        Maintenance result = maintenanceRepository.findScheduledMaintenanceByVehicleIdAndCompany(companyId, vehicleId);

        MaintenanceDTO maintenanceDto = new MaintenanceDTO(result);

        return maintenanceDto;
        
    }*/

    /*
    public PagedModel<EntityModel<MaintenanceDTO>> getAllMaintenanceByVehicleId(Pageable pageable, Long id){
        Page<MaintenanceDTO> maintenance = maintenanceRepository.findAllMaintenanceByVehicleId(id, pageable).<MaintenanceDTO>map(MaintenanceDTO::new);

        return pagedResourcesAssembler.toModel(maintenance);
    }*/
}
