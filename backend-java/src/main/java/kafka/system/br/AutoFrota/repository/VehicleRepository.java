package kafka.system.br.AutoFrota.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kafka.system.br.AutoFrota.dto.ReportDTO;
import kafka.system.br.AutoFrota.dto.VehicleStatusDTO;
import kafka.system.br.AutoFrota.model.Vehicle;

import java.util.List;
import java.util.UUID;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {


        @Query("""
                SELECT v FROM Vehicle v
                WHERE CAST(v.company.externalId AS String) = :externalId
                ORDER BY v.id DESC
                LIMIT 3
                """)
        List<Vehicle> findRecentVehiclesByCompany(@Param("externalId") String externalId);


        @Query("""
                SELECT 
                        SUM(CASE WHEN vs.type = 'MAINTENANCE' THEN 1 ELSE 0 END) AS maintenance,
                        SUM(CASE WHEN vs.type = 'ACTIVE' THEN 1 ELSE 0 END) AS active,
                        SUM(CASE WHEN vs.type = 'ALERT' THEN 1 ELSE 0 END) AS alert,
                        SUM(CASE WHEN vs.type = 'USAGE' THEN 1 ELSE 0 END) AS `usage`
                FROM VehicleStatus vs
                JOIN Vehicle v ON vs.id = v.vehicleStatus.id
                JOIN Company c ON v.company.id = c.id
                WHERE CAST(v.company.externalId AS String) = :externalId
                """)
        VehicleStatusDTO findVehicleCountByStatus(@Param("externalId") String externalId);


        @Query("""
            SELECT v 
            FROM Vehicle v
            JOIN VehicleStatus vs ON v.vehicleStatus.id = vs.id
            WHERE CAST(v.company.externalId AS String) = :externalId
            AND
            vs.type = :status
            """)
        Page<Vehicle> findAllVehiclesByCompany(@Param("externalId") String externalId, @Param("status") String status, Pageable pageable);


        @Query("""
            SELECT 
                COUNT(v.id) AS totalVehicles
            FROM Vehicle v
            WHERE v.company.externalId = :externalId
            """)
        Long findTotalVehiclesByCompany(@Param("externalId") String externalId);

        @Query("""
            SELECT 
                SUM(v.km) AS totalVehicles
            FROM Vehicle v
            WHERE CAST(v.company.externalId AS String) = :externalId
            """)
        Long findTotalKmByCompany(@Param("externalId") String externalId);

        @Query("""
            SELECT 
                v
            FROM Vehicle v
            WHERE CAST(v.company.externalId AS String) = :externalId
            AND v.id = :vehicleId
            """)
        Vehicle findInfosByVehicleIdAndCompany(@Param("externalId") String externalId, @Param("vehicleId") Long vehicleId);

}

