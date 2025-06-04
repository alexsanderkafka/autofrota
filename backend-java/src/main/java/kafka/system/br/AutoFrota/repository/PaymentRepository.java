package kafka.system.br.AutoFrota.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kafka.system.br.AutoFrota.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
    
}
