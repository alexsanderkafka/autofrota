package kafka.system.br.AutoFrota.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kafka.system.br.AutoFrota.model.ProfileImage;

public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long>{
    
}
