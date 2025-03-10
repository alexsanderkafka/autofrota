package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.repository.MaintenanceRepository;
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
    private PagedResourcesAssembler<MaintenanceDTO> pagedResourcesAssembler;

    public PagedModel<EntityModel<MaintenanceDTO>> getAllMaintenanceByVehicleId(Pageable pageable, Long id){
        Page<MaintenanceDTO> maintenance = maintenanceRepository.findAllMaintenanceByVehicleId(id, pageable).<MaintenanceDTO>map(MaintenanceDTO::new);

        return pagedResourcesAssembler.toModel(maintenance);
    }
}
