package kafka.system.br.AutoFrota.model;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "VehicleImage")
@Entity(name = "VehicleImage")
@Getter
@Setter
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "collectorId", nullable = true)
    private String collectorId;

    @Column(name = "paymentId", nullable = true)
    private String paymentId;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "externalRefence", nullable = true)
    private String externalRefence;

    @Column(name = "paymentType", nullable = true)
    private String paymentType;

    @Column(name = "processingMode", nullable = true)
    private String processingMode;

    @Column(name = "merchantAccountId", nullable = true)
    private String merchantAccountId;

    @Column(name = "confirmedDatePayment", nullable = true)
    private Date confirmedDatePayment;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    private Company company;
    
    
}
