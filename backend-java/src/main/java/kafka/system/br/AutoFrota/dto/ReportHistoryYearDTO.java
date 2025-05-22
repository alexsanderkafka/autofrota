package kafka.system.br.AutoFrota.dto;

import java.math.BigDecimal;

public record ReportHistoryYearDTO(
    String month,
    Double totalExpenseFuel,
    Double totalExpenseMaintenance
) {
    
}
