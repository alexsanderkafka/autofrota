package kafka.system.br.AutoFrota.repository;

import kafka.system.br.AutoFrota.dto.FuelDTO;
import kafka.system.br.AutoFrota.model.Fuel;

import java.util.Date;
import java.util.List;

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


    @Query("""
            SELECT 
                f
            FROM Fuel f
            WHERE CAST(f.vehicle.company.externalId AS String) = :externalId
            AND
            f.vehicle.id = :vehicleId
            """)
    Page<Fuel> findAllFuelByVehicleIdAndCompany(@Param("vehicleId") Long vehicleId, @Param("externalId") String externalId, Pageable pageable);

    @Query("""
            SELECT 
                f
            FROM Fuel f
            WHERE CAST(f.vehicle.company.externalId AS String) = :externalId
            AND
            f.vehicle.id = :vehicleId
            AND 
            f.date >= :startDate
            AND
            f.date <= :endDate
            """)
    Page<Fuel> findAllDateFilterFuelByVehicleIdAndCompany(@Param("vehicleId") Long vehicleId, @Param("externalId") String externalId, @Param("startDate") Date startDate, @Param("endDate") Date endDate, Pageable pageable);


    @Query("""
            SELECT
                DATE_FORMAT(f.date, '%b') AS month,
                COALESCE(SUM(f.totalValue), 0) AS totalExpenseFuel
            FROM Fuel f
            WHERE CAST(f.vehicle.company.externalId AS STRING) = :externalId
                AND 
            YEAR(f.date) = :year
            GROUP BY f.date
            ORDER BY f.date
    """)
    List<Object[]> findHistoryByCompanyAndYear(@Param("externalId") String externalId, @Param("year") Integer year);
}
