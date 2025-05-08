package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;


import java.util.Date;
import java.util.List;

@Table(name = "maintenance")
@Entity(name = "Maintenance")
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "maintenance_id")
    private Long id;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "done", nullable = false)
    private boolean done;

    @Column(name = "observation", nullable = false)
    private String observation;

    @Column(name = "scheduled", nullable = false)
    private boolean scheduled;

    @Column(name = "total_value", nullable = false)
    private float totalValue;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @OneToMany(mappedBy = "maintenance", fetch = FetchType.LAZY)
    private List<Services> services;

    public Maintenance() {
    }

    public Maintenance(Long id, Date date, boolean done, String observation, boolean scheduled, float totalValue,Vehicle vehicle) {
        this.id = id;
        this.date = date;
        this.done = done;
        this.observation = observation;
        this.scheduled = scheduled;
        this.totalValue = totalValue;
        this.vehicle = vehicle;
    }

    public Maintenance(Date date, boolean done, String observation, boolean scheduled, float totalValue, Vehicle vehicle) {
        this.date = date;
        this.done = done;
        this.observation = observation;
        this.scheduled = scheduled;
        this.totalValue = totalValue;
        this.vehicle = vehicle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public boolean isScheduled() {
        return scheduled;
    }

    public void setScheduled(boolean scheduled) {
        this.scheduled = scheduled;
    }

    public float getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(float totalValue) {
        this.totalValue = totalValue;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public List<Services> getServices() {
        return services;
    }

    public void setServices(List<Services> services) {
        this.services = services;
    }
}
