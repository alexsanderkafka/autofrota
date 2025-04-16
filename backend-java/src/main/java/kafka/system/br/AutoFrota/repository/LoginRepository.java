package kafka.system.br.AutoFrota.repository;


import kafka.system.br.AutoFrota.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {

    @Query("""
            SELECT a FROM Login a
            WHERE a.email = :email
            """)
    Login findByBusinessEmail(@Param("email") String email);

    @Query("""
            SELECT a FROM Authentication a
            WHERE a.business.id = :id
            """)
    Login findByBusinessId(@Param("id") Long id);
}
