package kafka.system.br.AutoFrota.service;

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
    
    public ReportDTO countTotalReport(String email){

        //verificar o email se existe

        Long countVehicles = vehicleRepository.findAllVehiclesByCompany(email);
        Long totalKm = vehicleRepository.findTotalKmByCompany(email);
        Double totalFuel = fuelRepository.findTotalExpensesWithFuelByCompany(email);
        Double totalMaintenance = maintenanceRepository.findTotalExpensesWithMaintenanceByCompany(email);

        return new ReportDTO(countVehicles, totalKm, totalFuel, totalMaintenance);
    }
}
