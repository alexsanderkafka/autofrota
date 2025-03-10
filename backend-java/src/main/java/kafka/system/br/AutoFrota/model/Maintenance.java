package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Table(name = "maintenance")
@Entity(name = "Maintenance")
public class Maintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "latest_maintenance", nullable = false)
    private Date latestMaintenance;

    @Column(name = "date_next_maintenance", nullable = false)
    private Date dateNextMaintenance;

    @Column(name = "date_maintenance", nullable = true)
    private Date dateMaintenance;

    @Column(name = "observation", nullable = false, length = 255)
    private String observation;

    @Column(name = "status", nullable = false, length = 255)
    private String status;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_identification_id")
    private VehicleIdentification vehicle;

    public Maintenance() {
    }

    public Maintenance(Long id, Date latestMaintenance, Date dateMaintenance, String observation, String status, VehicleIdentification vehicle) {
        this.id = id;
        this.latestMaintenance = latestMaintenance;
        this.dateMaintenance = dateMaintenance;
        this.observation = observation;
        this.status = status;
        this.vehicle = vehicle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getLatestMaintenance() {
        return latestMaintenance;
    }

    public void setLatestMaintenance(Date latestMaintenance) {
        this.latestMaintenance = latestMaintenance;
    }

    public Date getDateNextMaintenance() {
        return dateNextMaintenance;
    }

    public void setDateNextMaintenance(Date dateNextMaintenance) {
        this.dateNextMaintenance = dateNextMaintenance;
    }

    public Date getDateMaintenance() {
        return dateMaintenance;
    }

    public void setDateMaintenance(Date dateMaintenance) {
        this.dateMaintenance = dateMaintenance;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public VehicleIdentification getVehicle() {
        return vehicle;
    }

    public void setVehicle(VehicleIdentification vehicle) {
        this.vehicle = vehicle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Maintenance that = (Maintenance) o;
        return Objects.equals(id, that.id) && Objects.equals(latestMaintenance, that.latestMaintenance) && Objects.equals(dateNextMaintenance, that.dateNextMaintenance) && Objects.equals(dateMaintenance, that.dateMaintenance) && Objects.equals(observation, that.observation) && Objects.equals(status, that.status) && Objects.equals(vehicle, that.vehicle);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, latestMaintenance, dateNextMaintenance, dateMaintenance, observation, status, vehicle);
    }
}
