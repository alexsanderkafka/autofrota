package kafka.system.br.AutoFrota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kafka.system.br.AutoFrota.model.Driver;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DriverRepository extends JpaRepository<Driver, Long>{

    @Query("""
            SELECT d FROM Driver d
            WHERE CAST(d.company.externalId AS String) = :externalId
            """)
    Page<Driver> findAllByCompanyExternalId(@Param("externalId") String externalId, Pageable pageable);


    @Query("""
            SELECT d FROM Driver d
            WHERE CAST(d.company.externalId AS String) = :externalId
            AND
            d.id = :driverId
        """)
    Driver findDriverByCompanyExternalIdAndId(@Param("externalId") String companyId, @Param("driverId") Long driverId);
}
