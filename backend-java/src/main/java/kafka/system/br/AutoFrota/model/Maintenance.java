package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;


import java.util.Date;

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

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    public Maintenance() {
    }

    public Maintenance(Long id, Date date, boolean done, String observation, boolean scheduled, Vehicle vehicle) {
        this.id = id;
        this.date = date;
        this.done = done;
        this.observation = observation;
        this.scheduled = scheduled;
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

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
