package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.DateFilterDTO;
import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.dto.MaintenanceDoneDTO;
import kafka.system.br.AutoFrota.dto.MaintenanceDoneRegisterDTO;
import kafka.system.br.AutoFrota.dto.ServiceDTO;
import kafka.system.br.AutoFrota.exception.MaintenanceNotFoundException;
import kafka.system.br.AutoFrota.model.Maintenance;
import kafka.system.br.AutoFrota.model.Services;
import kafka.system.br.AutoFrota.model.Vehicle;
import kafka.system.br.AutoFrota.repository.MaintenanceRepository;
import kafka.system.br.AutoFrota.repository.ServiceRepository;
import kafka.system.br.AutoFrota.repository.VehicleRepository;

import java.util.List;
import java.util.stream.Collectors;

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
    private VehicleRepository vehicleRepository;

    @Autowired
    private PagedResourcesAssembler<MaintenanceDTO> pagedResourcesAssembler;

    @Autowired
    private PagedResourcesAssembler<MaintenanceDoneDTO> pagedResourcesAssemblerDone;

    public PagedModel<EntityModel<MaintenanceDTO>> getAllScheduledMaintenanceByVehicleId(Long vehicleId, String companyId, Pageable pageable) {
        //Verificar vehicle id
        //Verificar retorno null

        Page<MaintenanceDTO> result = maintenanceRepository.findAllScheduledMaintenanceByVehicleIdAndCompany(vehicleId, companyId, pageable).map(MaintenanceDTO::new);

        return pagedResourcesAssembler.toModel(result);
    }

    public PagedModel<EntityModel<MaintenanceDoneDTO>> getAllDoneMaintenanceByVehicleId(Long vehicleId, String companyId, Pageable pageable) {
        
        //Verificar vehicle id
        //Verificar retorno null

        Page<MaintenanceDoneDTO> result = maintenanceRepository.findAllDoneMaintenanceByVehicleIdAndCompany(vehicleId, companyId, pageable).map(MaintenanceDoneDTO::new);

        return pagedResourcesAssemblerDone.toModel(result);
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

    public MaintenanceDoneDTO getLastMaintenance(String companyId, Long vehicleId) {
        //Verificar se realmenter esse id existe
        //Precisa verificar o null
        //Retorno vazio se não existe
        //Retorno caso o companyId não exista
        
        Maintenance maintenance = maintenanceRepository.findLastMaintenanceByVehicleIdAndCompany(companyId, vehicleId);

        if(maintenance == null) throw new MaintenanceNotFoundException("Maintenance not found for vehicle id: " + vehicleId);

        MaintenanceDoneDTO scheduledMaintenanceDto = new MaintenanceDoneDTO(maintenance);

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

    public void saveScheduled(MaintenanceDTO dto) {

        //Se for scheduled verificar se a data é maior que a data atual
        //Verificar se é scheduled e done, se for scheduled, done FALSE
        //Se for agendada não pode possuir valor

        Vehicle vehicle = vehicleRepository.getReferenceById(dto.vehicleId());

        //Verificar se vehicle existe, no caso null
        //Verificar se tem permissão

        Maintenance maintenance = new Maintenance(
            dto.date(),
            dto.done(),
            dto.observation(),
            dto.scheduled(),
            (float) dto.totalValue(),
            vehicle
        );

        maintenanceRepository.save(maintenance);
    }

    public void saveDone(MaintenanceDoneRegisterDTO dto) {
        //Verificar se done é true
        //Verificar se tem valor

        Vehicle vehicle = vehicleRepository.getReferenceById(dto.maintenance().vehicleId());

        //Verificar se vehicle existe, no caso null
        //Verificar se tem permissão

        Maintenance maintenance = new Maintenance(
            dto.maintenance().date(),
            dto.maintenance().done(),
            dto.maintenance().observation(),
            dto.maintenance().scheduled(),
            (float) dto.maintenance().totalValue(),
            vehicle
        );

        Maintenance savedMaintenance = maintenanceRepository.save(maintenance);

        List<Services> services = dto.services().stream().map(t -> new Services(
            t,
            savedMaintenance
        )).collect(Collectors.toList());;

        serviceRepository.saveAll(services);
    }
}
