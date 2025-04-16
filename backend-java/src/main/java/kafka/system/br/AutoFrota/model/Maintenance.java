package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;

import java.util.Date;

@Table(name = "Maintenance")
@Entity(name = "Maintenance")
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "date_next_maintenance", nullable = false)
    private Date dateNextMaintenance;

    @Column(name = "done", nullable = false)
    private boolean done;

    @Column(name = "observation", nullable = false)
    private String observation;

    @Column(name = "scheduled", nullable = false)
    private boolean scheduled;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

}
