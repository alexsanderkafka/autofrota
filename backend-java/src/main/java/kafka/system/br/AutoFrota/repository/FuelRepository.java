package kafka.system.br.AutoFrota.repository;

import kafka.system.br.AutoFrota.model.Fuel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface FuelRepository extends JpaRepository<Fuel, Long> {
    //Page<Fuel> findAllFuelByVehicleId(Long id, Pageable pageable);

    @Query("""
            SELECT 
                SUM(f.totalValue) AS totalExpense
            FROM Fuel f
            WHERE CAST(f.vehicle.company.externalId AS String) = :externalId
            """)
    Double findTotalExpensesWithFuelByCompany(@Param("externalId") String externalId);


    @Query("""
            SELECT 
                f
            FROM Fuel f
            WHERE CAST(f.vehicle.company.externalId AS String) = :externalId
            AND
            f.vehicle.id = :vehicleId
            ORDER BY f.date DESC
            LIMIT 1
            """)
    Fuel findLastFuelByVehicleIdAndCompany(@Param("externalId") String externalId, @Param("vehicleId") Long vehicleId);
}
