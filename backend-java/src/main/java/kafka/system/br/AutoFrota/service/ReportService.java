package kafka.system.br.AutoFrota.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kafka.system.br.AutoFrota.dto.ReportDTO;
import kafka.system.br.AutoFrota.model.Fuel;
import kafka.system.br.AutoFrota.repository.FuelRepository;
import kafka.system.br.AutoFrota.repository.MaintenanceRepository;
import kafka.system.br.AutoFrota.repository.VehicleRepository;

@Service
public class ReportService {
    
    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private FuelRepository fuelRepository;

    @Autowired
    private MaintenanceRepository maintenanceRepository;
    
    public ReportDTO countTotalReport(String userId){

        //verificar o email se existe

        Long countVehicles = vehicleRepository.findTotalVehiclesByCompany(userId);
        Long totalKm = vehicleRepository.findTotalKmByCompany(userId);
        Double totalFuel = fuelRepository.findTotalExpensesWithFuelByCompany(userId);
        Double totalMaintenance = maintenanceRepository.findTotalExpensesWithMaintenanceByCompany(userId);

        return new ReportDTO(countVehicles, totalKm, totalFuel, totalMaintenance);
    }
}
