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
            WHERE f.vehicle.company.login.email = :email
            """)
    Double findTotalExpensesWithFuelByCompany(@Param("email") String email);
}
