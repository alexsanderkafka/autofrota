package kafka.system.br.AutoFrota.repository;

import kafka.system.br.AutoFrota.dto.MaintenanceDTO;
import kafka.system.br.AutoFrota.model.Maintenance;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {


        @Query("""
            SELECT 
                SUM(m.totalValue) AS totalExpense
            FROM Maintenance m
            WHERE CAST(m.vehicle.company.externalId AS String) = :externalId
            """)
        Double findTotalExpensesWithMaintenanceByCompany(@Param("externalId") String externalId);

        @Query("""
            SELECT 
                m
            FROM Maintenance m
                WHERE CAST(m.vehicle.company.externalId AS String) = :externalId
            AND
                m.vehicle.id = :vehicleId
            AND
                m.done = false
            AND
                m.scheduled = true
            ORDER BY m.date ASC
            LIMIT 1
            """)
        Maintenance findScheduledMaintenanceByVehicleIdAndCompany(@Param("externalId") String externalId, @Param("vehicleId") Long vehicleId);

        @Query("""
            SELECT 
                m
            FROM Maintenance m
                WHERE CAST(m.vehicle.company.externalId AS String) = :externalId
            AND
                m.vehicle.id = :vehicleId
            AND
                m.done = true
            ORDER BY m.date DESC
            LIMIT 1
            """)
        Maintenance findLastMaintenanceByVehicleIdAndCompany(@Param("externalId") String externalId, @Param("vehicleId") Long vehicleId);

        @Query("""
            SELECT 
                m
            FROM Maintenance m
                WHERE CAST(m.vehicle.company.externalId AS String) = :externalId
            AND
                m.vehicle.id = :vehicleId
            AND
                m.done = false
            AND
                m.scheduled = true
            """)
        Page<Maintenance> findAllScheduledMaintenanceByVehicleIdAndCompany(@Param("vehicleId") Long vehicleId, @Param("externalId") String externalId, Pageable pageable);


        @Query("""
            SELECT 
                m
            FROM Maintenance m
                WHERE CAST(m.vehicle.company.externalId AS String) = :externalId
            AND
                m.vehicle.id = :vehicleId
            AND
                m.done = true
            """)
        Page<Maintenance> findAllDoneMaintenanceByVehicleIdAndCompany(@Param("vehicleId") Long vehicleId, @Param("externalId") String externalId, Pageable pageable);

        @Query("""
            SELECT 
                m
            FROM Maintenance m
                WHERE CAST(m.vehicle.company.externalId AS String) = :externalId
            AND
                m.vehicle.id = :vehicleId
            AND
                m.done = true
            AND
                m.date >= :startDate
            AND
                m.date <= :endDate
            """)
        Page<Maintenance> findAllFilterDoneMaintenanceByVehicleIdAndCompany(@Param("vehicleId") Long vehicleId, @Param("externalId") String externalId, @Param("startDate") Date startDate, @Param("endDate") Date endDate, Pageable pageable);

        @Query("""
            SELECT 
                m
            FROM Maintenance m
                WHERE CAST(m.vehicle.company.externalId AS String) = :externalId
            AND
                m.vehicle.id = :vehicleId
            AND
                m.scheduled = true
            AND
                m.done = false
            AND
                m.date >= :startDate
            AND
                m.date <= :endDate
            """)
        Page<Maintenance> findAllFilterScheduledMaintenanceByVehicleIdAndCompany(@Param("vehicleId") Long vehicleId, @Param("externalId") String externalId, @Param("startDate") Date startDate, @Param("endDate") Date endDate, Pageable pageable);


        @Query("""
            SELECT
                DATE_FORMAT(m.date, '%b') AS month,
                COALESCE(SUM(m.totalValue), 0) AS totalExpenseFuel
            FROM Fuel m
            WHERE CAST(m.vehicle.company.externalId AS STRING) = :externalId
                AND 
            YEAR(m.date) = :year
            GROUP BY m.date
            ORDER BY m.date
        """)
        List<Object[]> findHistoryByCompanyAndYear(@Param("externalId") String externalId, @Param("year") Integer year);


}