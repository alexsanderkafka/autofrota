package kafka.system.br.AutoFrota.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.DecodedJWT;

import kafka.system.br.AutoFrota.dto.ReportDTO;
import kafka.system.br.AutoFrota.dto.ReportHistoryYearDTO;
import kafka.system.br.AutoFrota.security.TokenProvider;
import kafka.system.br.AutoFrota.service.ReportService;
import kafka.system.br.AutoFrota.service.VehicleService;

@RestController
@RequestMapping("/reports")
public class ReportController {
    
    @Autowired
    private ReportService reportService;

    @Autowired
    private TokenProvider tokenProvider;


    @GetMapping("/{userId}/total")
    public ResponseEntity<?> getTotalReportsWithMaintenanceAndFuel(
        @RequestHeader("Authorization") String authorizationHeader,
        @PathVariable(value = "userId") String userId
    ){

        ReportDTO report = reportService.countTotalReport(userId);

        return ResponseEntity.ok(report);
    }

    @GetMapping("/{userId}/history/{year}")
    public ResponseEntity<?> getHistoryYear(
        @RequestHeader("Authorization") String authorizationHeader,
        @PathVariable(value = "userId") String userId,
        @PathVariable(value = "year") Integer year
    ){

        List<ReportHistoryYearDTO> report = reportService.history(userId, year);

        return ResponseEntity.ok(report);
    }

    //Vai ficar a parte de gerar pdf e docx
}
