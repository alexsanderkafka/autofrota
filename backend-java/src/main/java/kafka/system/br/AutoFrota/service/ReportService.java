package kafka.system.br.AutoFrota.service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;

import kafka.system.br.AutoFrota.dto.ReportDTO;
import kafka.system.br.AutoFrota.dto.ReportHistoryYearDTO;
import kafka.system.br.AutoFrota.dto.VehicleExpenseDTO;
import kafka.system.br.AutoFrota.exception.ErrorToCreatePdfException;
import kafka.system.br.AutoFrota.exception.NotFoundEntityException;
import kafka.system.br.AutoFrota.model.Company;
import kafka.system.br.AutoFrota.model.Fuel;
import kafka.system.br.AutoFrota.model.Maintenance;
import kafka.system.br.AutoFrota.model.Vehicle;
import kafka.system.br.AutoFrota.repository.CompanyRepository;
import kafka.system.br.AutoFrota.repository.FuelRepository;
import kafka.system.br.AutoFrota.repository.MaintenanceRepository;
import kafka.system.br.AutoFrota.repository.VehicleRepository;
import kafka.system.br.AutoFrota.utils.CustomPdf;

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

    public byte[] getHistoryPdf(String externalId) {

        Company company = companyRepository.findByExternalId(externalId);
        if(company == null) throw new NotFoundEntityException("Company not found");

        List<VehicleExpenseDTO> vehicles = vehicleRepository.findAllVehiclesByCompanyAndExpense(externalId);
        
        byte[] pdf = CustomPdf.generateCompanyPdf(vehicles, company.getName());

        return pdf;
    }

    public byte[] getHistoryVehiclePdf(String externalId, Long vehicleId) {
        Company company = companyRepository.findByExternalId(externalId);
        if(company == null) throw new NotFoundEntityException("Company not found");

        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElseThrow(() -> new NotFoundEntityException("Vehicle not found"));

        List<Maintenance> maintenances = maintenanceRepository.findAllDoneMaintenanceByVehicleIdAndCompany(vehicleId, externalId);
        List<Fuel> fuels = fuelRepository.findAllFuelByVehicleIdAndCompany(vehicleId, externalId);

        byte[] pdf = CustomPdf.generateVehiclePdf(company.getName(), maintenances, fuels, vehicle);

        return pdf;
    }
}
