package kafka.system.br.AutoFrota.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import kafka.system.br.AutoFrota.model.Services;

public interface ServiceRepository extends JpaRepository<Services, Long> {

    @Query("""
            SELECT s 
            FROM Services s
            WHERE s.maintenance.id = :id
            """)
    List<Services> findAllByMaintenanceId(Long id);
    
}
