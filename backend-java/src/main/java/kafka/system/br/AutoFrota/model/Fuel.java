package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Table(name = "fuel")
@Entity(name = "Fuel")
public class Fuel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "liters", nullable = false)
    private float liters;

    @Column(name = "total_value", nullable = false)
    private float totalValue;

    @Column(name = "km", nullable = false)
    private Integer km;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    public Fuel() {
    }

    public Fuel(Long id, float liters, float totalValue, Integer km, Date date, String type, Vehicle vehicle) {
        this.id = id;
        this.liters = liters;
        this.totalValue = totalValue;
        this.km = km;
        this.date = date;
        this.type = type;
        this.vehicle = vehicle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getLiters() {
        return liters;
    }

    public void setLiters(float liters) {
        this.liters = liters;
    }

    public float getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(float totalValue) {
        this.totalValue = totalValue;
    }

    public Integer getKm() {
        return km;
    }

    public void setKm(Integer km) {
        this.km = km;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
