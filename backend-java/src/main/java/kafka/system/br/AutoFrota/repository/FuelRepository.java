package kafka.system.br.AutoFrota.repository;

import kafka.system.br.AutoFrota.model.Fuel;
import kafka.system.br.AutoFrota.model.Maintenance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FuelRepository extends JpaRepository<Fuel, Long> {

    @Query("""
            SELECT f FROM Fuel f
            WHERE f.vehicle.id = :id
            AND
            f.id = (SELECT MAX(f2.id) FROM Fuel f2 WHERE f2.vehicle.id = :id)
            """)
    Fuel findOneLatestFuel(@Param("id") Long id);

    @Query("""
            SELECT f FROM Fuel f
            WHERE f.vehicle.id = :id
            """)
    Page<Fuel> findAllFuelByVehicleId(Long id, Pageable pageable);
}
