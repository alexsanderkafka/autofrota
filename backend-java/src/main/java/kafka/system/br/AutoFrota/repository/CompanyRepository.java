package kafka.system.br.AutoFrota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kafka.system.br.AutoFrota.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long>{

    @Query("""
            SELECT c FROM Company c
            WHERE CAST(c.externalId AS String) = :externalId
            """)
    Company findByExternalId(@Param("externalId") String externalId);
    
}
