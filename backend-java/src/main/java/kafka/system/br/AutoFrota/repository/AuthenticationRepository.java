package kafka.system.br.AutoFrota.repository;


import kafka.system.br.AutoFrota.model.Authentication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepository extends JpaRepository<Authentication, Long> {

    @Query("""
            SELECT a FROM Authentication a
            WHERE a.email = :email
            """)
    Authentication findByBusinessEmail(@Param("email") String email);

    @Query("""
            SELECT a FROM Authentication a
            WHERE a.business.id = :id
            """)
    Authentication findByBusinessId(@Param("id") Long id);
}
