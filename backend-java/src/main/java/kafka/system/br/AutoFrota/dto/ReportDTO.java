package kafka.system.br.AutoFrota.dto;

import java.util.Date;

import jakarta.validation.constraints.Null;

public record ReportDTO(
    @Null
    Long totalVehicles,
    @Null
    Long totalKm,
    @Null
    Double totalExpenseFuel,
    @Null
    Double totalExpenseMaintenance
) {

    public ReportDTO(Long totalVehicles, Long totalKm, Double totalExpenseFuel, Double totalExpenseMaintenance){
        this.totalVehicles = totalVehicles;
        this.totalKm = totalKm;
        this.totalExpenseFuel = totalExpenseFuel;
        this.totalExpenseMaintenance = totalExpenseMaintenance;
    }
}

