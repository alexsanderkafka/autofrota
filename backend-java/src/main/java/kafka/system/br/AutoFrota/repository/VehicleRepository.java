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

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {


        @Query("""
                SELECT v FROM Vehicle v
                WHERE v.company.login.email = :email
                ORDER BY v.id DESC
                LIMIT 3
                """)
        List<Vehicle> findRecentVehiclesByCompanyEmail(@Param("email") String email);


        @Query("""
                SELECT 
                        SUM(CASE WHEN vs.type = 'MAINTENANCE' THEN 1 ELSE 0 END) AS maintenance,
                        SUM(CASE WHEN vs.type = 'ACTIVE' THEN 1 ELSE 0 END) AS active,
                        SUM(CASE WHEN vs.type = 'ALERT' THEN 1 ELSE 0 END) AS alert,
                        SUM(CASE WHEN vs.type = 'USAGE' THEN 1 ELSE 0 END) AS `usage`
                FROM VehicleStatus vs
                JOIN Vehicle v ON vs.id = v.vehicleStatus.id
                JOIN Company c ON v.company.id = c.id
                JOIN Login l ON c.login.id = l.id
                WHERE l.email = :email
                """)
        VehicleStatusDTO findVehicleCountByStatus(@Param("email") String email);



        @Query("""
            SELECT v 
            FROM Vehicle v
            JOIN VehicleStatus vs ON v.vehicleStatus.id = vs.id
            WHERE v.company.login.email = :email
            AND
            vs.type = :status
            """)
        Page<Vehicle> findAllVehiclesByCompanyEmail(@Param("email") String email, @Param("status") String status, Pageable pageable);


        @Query("""
            SELECT 
                COUNT(v.id) AS totalVehicles
            FROM Vehicle v
            WHERE v.company.login.email = :email
            """)
        Long findAllVehiclesByCompany(@Param("email") String email);

        @Query("""
            SELECT 
                SUM(v.km) AS totalVehicles
            FROM Vehicle v
            WHERE v.company.login.email = :email
            """)
        Long findTotalKmByCompany(@Param("email") String email);

}

