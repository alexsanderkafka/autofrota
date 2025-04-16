package kafka.system.br.AutoFrota.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kafka.system.br.AutoFrota.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long>{
    
}
