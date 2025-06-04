package kafka.system.br.AutoFrota.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kafka.system.br.AutoFrota.dto.ReportHistoryYearDTO;
import kafka.system.br.AutoFrota.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long>{

    @Query("""
            SELECT c FROM Company c
            WHERE CAST(c.externalId AS String) = :externalId
            """)
    Company findByExternalId(@Param("externalId") String externalId);



    /*
    @Query("""
            SELECT
                DATE_FORMAT(f.date, '%b') AS month,
                COALESCE(SUM(f.totalValue), 0) AS totalExpenseFuel,
                COALESCE(SUM(m.totalValue), 0) AS totalExpenseMaintenance
            FROM Company c
            INNER JOIN Fuel f ON f.vehicle.company.id = c.id
            INNER JOIN Maintenance m ON m.vehicle.company.id = c.id
            WHERE CAST(c.externalId AS STRING) = :externalId
                AND YEAR(f.date) = :year
                AND YEAR(m.date) = :year
            GROUP BY f.date
            ORDER BY MONTH(f.date)
    """)
    List<Object[]> findHistoryByCompanyAndYear(@Param("externalId") String externalId, @Param("year") Integer year);*/

    @Query(value = """
            SELECT
                t.month AS month,
                SUM(t.totalExpenseFuel) AS totalExpenseFuel,
                SUM(t.totalExpenseMaintenance) AS totalExpenseMaintenance
            FROM(
                SELECT
                    MONTH(f.date) AS month,
                    COALESCE(SUM(f.total_value), 0) AS totalExpenseFuel,
                    0 AS totalExpenseMaintenance
                FROM company c
                INNER JOIN vehicle v ON v.company_id = c.id
                INNER JOIN fuel f ON f.vehicle_id = v.id
                WHERE CAST(c.external_id AS CHAR) = :externalId
                    AND YEAR(f.date) = :year
                GROUP BY MONTH(f.date)

                UNION ALL

                SELECT
                    MONTH(m.date) AS month,
                    0 AS totalExpenseFuel,
                    COALESCE(SUM(m.total_value), 0) AS totalExpenseMaintenance
                FROM company c
                INNER JOIN vehicle v ON v.company_id = c.id
                INNER JOIN maintenance m ON m.vehicle_id = v.id
                WHERE CAST(c.external_id AS CHAR) = :externalId
                    AND YEAR(m.date) = :year
                GROUP BY MONTH(m.date)
            ) AS t
            GROUP BY t.month
            ORDER BY t.month
    """, nativeQuery = true)
    List<Object[]> findHistoryByCompanyAndYear(@Param("externalId") String externalId, @Param("year") Integer year);
}
