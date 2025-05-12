package kafka.system.br.AutoFrota.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kafka.system.br.AutoFrota.model.VehicleImage;

public interface VehicleImageRepository extends JpaRepository<VehicleImage, Long>{
    
}
