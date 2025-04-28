package kafka.system.br.AutoFrota.repository;

import kafka.system.br.AutoFrota.dto.ScheduledMaintenanceDTO;
import kafka.system.br.AutoFrota.model.Maintenance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {

        @Query("""
            SELECT 
                SUM(s.totalValue) AS totalExpense
            FROM Maintenance m
                JOIN Services s ON m.id = s.maintenance.id
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
            ORDER BY m.date DESC
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
                m.done = false
            ORDER BY m.date DESC
            LIMIT 1
            """)
        Maintenance findLastMaintenanceByVehicleIdAndCompany(@Param("externalId") String externalId, @Param("vehicleId") Long vehicleId);

    /*
    @Query("""
            SELECT m FROM Maintenance m
            WHERE m.vehicle.business.id = :id
            """)
    Page<Maintenance> findAllVehiclesByBusinessId(@Param("id") Long id, Pageable pageable);

    @Query("""
            SELECT m FROM Maintenance m
            WHERE m.vehicle.id = :id
            """)
    Page<Maintenance> findAllMaintenanceByVehicleId(@Param("id") Long id, Pageable pageable);

    @Query("""
            SELECT m FROM Maintenance m
            WHERE m.vehicle.id = :id
            AND
            m.id = (SELECT MAX(m2.id) FROM Maintenance m2 WHERE m2.vehicle.id = :id)
            """)
    Maintenance findOneLatestMaintenance(@Param("id") Long id);

    @Query("""
            SELECT m FROM Maintenance m
            WHERE m.vehicle.id = :id
            AND
            m.id = (SELECT MAX(m2.id) FROM Maintenance m2 WHERE m2.vehicle.id = :id)
            AND
            m.status = :status
            """)
    Maintenance findOneLatestStatusMaintenance(@Param("id") Long id, @Param("status") String status);*/

}