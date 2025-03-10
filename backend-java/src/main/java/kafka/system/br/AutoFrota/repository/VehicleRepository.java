package kafka.system.br.AutoFrota.repository;

import kafka.system.br.AutoFrota.model.VehicleIdentification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<VehicleIdentification, Long> {

    @Query("""
            SELECT v FROM VehicleIdentification v
            WHERE v.business.id = :id
            """)
    Page<VehicleIdentification> findAllVehiclesByBusinessId(@Param("id") Long id, Pageable pageable);

    @Query("""
            SELECT v FROM VehicleIdentification v
            INNER JOIN Maintenance m
            ON v.id = m.vehicle.id
            WHERE v.business.id = :id
            AND
            m.status = :status
            """)
    Page<VehicleIdentification> findAllVehiclesDelayedMaintenance(@Param("id") Long id, @Param("status") String status, Pageable pageable);

}

