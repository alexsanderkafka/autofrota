package kafka.system.br.AutoFrota.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kafka.system.br.AutoFrota.model.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("""
            SELECT v FROM Vehicle v
            WHERE v.Company.id = :id
            """)
    Page<Vehicle> findAllVehiclesByBusinessId(@Param("id") Long id, Pageable pageable);

    @Query("""
            SELECT v FROM Vehicle v
            INNER JOIN Maintenance m
            ON v.id = m.Vehicle.id
            WHERE v.Company.id = :id
            AND
            m.status = :status
            """)
    Page<Vehicle> findAllVehiclesDelayedMaintenance(@Param("id") Long id, @Param("status") String status, Pageable pageable);

}

