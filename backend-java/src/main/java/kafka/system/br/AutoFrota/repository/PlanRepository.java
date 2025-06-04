package kafka.system.br.AutoFrota.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kafka.system.br.AutoFrota.model.Plan;

public interface PlanRepository extends JpaRepository<Plan, Long>{
    
}
