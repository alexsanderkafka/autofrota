package kafka.system.br.AutoFrota.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kafka.system.br.AutoFrota.model.VehicleStatus;

public interface VehicleStatusRepository extends JpaRepository<VehicleStatus, Long> {

    @Query("SELECT v FROM VehicleStatus v WHERE v.type = :type")
    VehicleStatus findByVehicleStatusByType(@Param("type") String type);    
}
