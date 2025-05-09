package kafka.system.br.AutoFrota.repository;


import kafka.system.br.AutoFrota.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {

    @Query("""
            SELECT a FROM Login a
            WHERE a.email = :email
            """)
    Login findByCompanyEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query("""
            UPDATE Login l
            JOIN Company c ON l.id = c.login.id 
            SET l.password = :password
            WHERE c.externalId = :externalId
            """)
    void updatePasswordByCompany(@Param("externalId") String externalId, @Param("password") String password);

    /*
    @Query("""
            SELECT a FROM Login a
            WHERE a.business.id = :id
            """)
    Login findByBusinessId(@Param("id") Long id);*/
}
