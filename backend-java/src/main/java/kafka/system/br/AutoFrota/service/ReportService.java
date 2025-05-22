package kafka.system.br.AutoFrota.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kafka.system.br.AutoFrota.dto.ReportDTO;
import kafka.system.br.AutoFrota.dto.ReportHistoryYearDTO;
import kafka.system.br.AutoFrota.model.Fuel;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
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

    @Autowired
    private CompanyRepository companyRepository;
    
    public ReportDTO countTotalReport(String companyId){

        Long countVehicles = vehicleRepository.findTotalVehiclesByCompany(companyId);
        Long totalKm = vehicleRepository.findTotalKmByCompany(companyId);
        Double totalFuel = fuelRepository.findTotalExpensesWithFuelByCompany(companyId);
        Double totalMaintenance = maintenanceRepository.findTotalExpensesWithMaintenanceByCompany(companyId);

        return new ReportDTO(countVehicles, totalKm, totalFuel, totalMaintenance);
    }

    public List<ReportHistoryYearDTO> history(String userId, Integer year) {
    
        //Verificar se o retorno é vazio
            
        List<ReportHistoryYearDTO> result = companyRepository.findHistoryByCompanyAndYear(userId, year).stream()
            .map(obj -> new ReportHistoryYearDTO(
                (String) obj[0].toString(),
                (Double) obj[1],
                (Double) obj[2]
            ))
            .toList();
        
        return result;
    }
}
