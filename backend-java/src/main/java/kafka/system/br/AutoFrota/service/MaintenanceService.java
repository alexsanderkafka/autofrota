package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.DateFilterDTO;
import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.dto.ScheduledMaintenanceDTO;
import kafka.system.br.AutoFrota.dto.ServiceDTO;
import kafka.system.br.AutoFrota.exception.MaintenanceNotFoundException;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private PagedResourcesAssembler<MaintenanceDTO> pagedResourcesAssembler;

    @Autowired
    private PagedResourcesAssembler<ScheduledMaintenanceDTO> pagedResourcesAssemblerScheduled;

    public PagedModel<EntityModel<MaintenanceDTO>> getAllScheduledMaintenanceByVehicleId(Long vehicleId, String companyId, Pageable pageable) {
        //Verificar vehicle id
        //Verificar retorno null

        Page<MaintenanceDTO> result = maintenanceRepository.findAllScheduledMaintenanceByVehicleIdAndCompany(vehicleId, companyId, pageable).map(MaintenanceDTO::new);

        return pagedResourcesAssembler.toModel(result);
    }

    public PagedModel<EntityModel<ScheduledMaintenanceDTO>> getAllDoneMaintenanceByVehicleId(Long vehicleId, String companyId, Pageable pageable) {
        
        //Verificar vehicle id
        //Verificar retorno null

        Page<ScheduledMaintenanceDTO> result = maintenanceRepository.findAllDoneMaintenanceByVehicleIdAndCompany(vehicleId, companyId, pageable).map(ScheduledMaintenanceDTO::new);

        return pagedResourcesAssemblerScheduled.toModel(result);
    }

    public MaintenanceDTO getScheduledMaintenance(String companyId, Long vehicleId) {
        //Verificar se realmenter esse id existe
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista

        Maintenance result = maintenanceRepository.findScheduledMaintenanceByVehicleIdAndCompany(companyId, vehicleId);

        if(result == null) throw new MaintenanceNotFoundException("Scheduled maintenance not found for vehicle id: " + vehicleId);

        MaintenanceDTO maintenanceDto = new MaintenanceDTO(result);

        return maintenanceDto;
    }

    public ScheduledMaintenanceDTO getLastMaintenance(String companyId, Long vehicleId) {
        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista
        
        Maintenance maintenance = maintenanceRepository.findLastMaintenanceByVehicleIdAndCompany(companyId, vehicleId);

        if(maintenance == null) throw new MaintenanceNotFoundException("Maintenance not found for vehicle id: " + vehicleId);

        ScheduledMaintenanceDTO scheduledMaintenanceDto = new ScheduledMaintenanceDTO(maintenance);

        return scheduledMaintenanceDto;
    }

    public PagedModel<EntityModel<MaintenanceDTO>> getAllFilterDoneMaintenanceByVehicleId(Long vehicleId, String companyId, DateFilterDTO filter, Pageable pageable) {
        
        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista


        Page<MaintenanceDTO> result = maintenanceRepository.findAllFilterDoneMaintenanceByVehicleIdAndCompany(vehicleId, companyId, filter.startDate(), filter.endDate(), pageable).map(MaintenanceDTO::new);
        
        return pagedResourcesAssembler.toModel(result);
    }

    public PagedModel<EntityModel<MaintenanceDTO>> getAllFilterScheduledMaintenanceByVehicleId(Long vehicleId, String companyId, DateFilterDTO filter, Pageable pageable) {
        
        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista


        Page<MaintenanceDTO> result = maintenanceRepository.findAllFilterScheduledMaintenanceByVehicleIdAndCompany(vehicleId, companyId, filter.startDate(), filter.endDate(), pageable).map(MaintenanceDTO::new);
        
        return pagedResourcesAssembler.toModel(result);
    }
}
