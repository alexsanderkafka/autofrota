package kafka.system.br.AutoFrota.service;

import kafka.system.br.AutoFrota.dto.FuelDTO;
import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.dto.VehicleDTO;
import kafka.system.br.AutoFrota.model.Fuel;
import kafka.system.br.AutoFrota.model.Maintenance;
import kafka.system.br.AutoFrota.repository.FuelRepository;
import kafka.system.br.AutoFrota.repository.MaintenanceRepository;
import kafka.system.br.AutoFrota.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public PagedModel<EntityModel<VehicleDTO>> getAllVehiclesByBusinessId(Pageable pageable, Long id){

        Page<VehicleDTO> vehiclePage = vehicleRepository.findAllVehiclesByBusinessId(id, pageable).map(v -> {
            //var maintenanceList =  maintenanceRepository.findAllMaintenanceVehicle(v.getId()).stream().map(MaintenanceDTO::new);

            var maintenance = maintenanceRepository.findOneLatestMaintenance(v.getId());
            MaintenanceDTO currentMaintenance;

            if(maintenance != null){
                currentMaintenance = new MaintenanceDTO(maintenance);
            }else{
                currentMaintenance = new MaintenanceDTO();
            }

            var fuel = fuelRepository.findOneLatestFuel(v.getId());
            FuelDTO latestFuel;

            if (fuel != null) {
                latestFuel = new FuelDTO(fuel);
            } else {
                System.out.println("Fuel não encontrado para o veículo com id: " + v.getId());
                latestFuel = new FuelDTO();
            }

            return new VehicleDTO(v, currentMaintenance, latestFuel);
        });

        return pagedResourcesAssembler.toModel(vehiclePage);
    }

    public PagedModel<EntityModel<VehicleDTO>> getAllVehiclesWithStatusMaintenance(Pageable pageable, Long id, String status){

        Page<VehicleDTO> vehiclePage = vehicleRepository.findAllVehiclesDelayedMaintenance(id, status, pageable).map(v -> {
            System.out.println("Status: " + status);

            var currentMaintenance = new MaintenanceDTO(maintenanceRepository.findOneLatestMaintenance(v.getId()));

            var fuel = fuelRepository.findOneLatestFuel(v.getId());
            FuelDTO latestFuel;

            if (fuel != null) {
                latestFuel = new FuelDTO(fuel);
            } else {
                System.out.println("Fuel não encontrado para o veículo com id: " + v.getId());
                latestFuel = new FuelDTO(new Fuel());
            }

            return new VehicleDTO(v, currentMaintenance, latestFuel);
        });

        return pagedResourcesAssembler.toModel(vehiclePage);
    }

}
