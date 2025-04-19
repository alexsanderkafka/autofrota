package kafka.system.br.AutoFrota.repository;

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
                JOIN Service s ON m.id = s.maintenance.id
            WHERE m.vehicle.company.login.email = :email
            """)
        Double findTotalExpensesWithMaintenanceByCompany(@Param("email") String email);

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