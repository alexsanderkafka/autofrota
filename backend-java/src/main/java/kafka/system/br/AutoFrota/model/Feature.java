package kafka.system.br.AutoFrota.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Table(name = "Permission")
@Entity(name = "Permission")
@Getter
@Setter
@AllArgsConstructor
public class Feature {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "suport", nullable = false)
    private boolean suport;

    @Column(name = "dashboard", nullable = false)
    private boolean dashboard;

    @Column(name = "notify", nullable = false)
    private boolean notify;

    @Column(name = "manage_vehicles", nullable = false)
    private boolean manageVehicle;

    @Column(name = "reports", nullable = false)
    private boolean checklist;

    public Feature(){}
    
}
