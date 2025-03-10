package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Table(name = "fuel")
@Entity(name = "Fuel")
public class Fuel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "latest_fuel", nullable = false)
    private Date latestFuel;

    @Column(name = "litter", nullable = false)
    private float litter;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "km", nullable = false, length = 255)
    private String km;

    @Column(name = "fuel_type", nullable = false, length = 100)
    private String fuelType;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_identification_id")
    private VehicleIdentification vehicle;

    public Fuel() {
    }

    public Fuel(Long id, Date latestFuel, float litter, float price, String km, String fuelType, VehicleIdentification vehicle) {
        this.id = id;
        this.latestFuel = latestFuel;
        this.litter = litter;
        this.price = price;
        this.km = km;
        this.fuelType = fuelType;
        this.vehicle = vehicle;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getLatestFuel() {
        return latestFuel;
    }

    public void setLatestFuel(Date latestFuel) {
        this.latestFuel = latestFuel;
    }

    public float getLitter() {
        return litter;
    }

    public void setLitter(float litter) {
        this.litter = litter;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getKm() {
        return km;
    }

    public void setKm(String km) {
        this.km = km;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
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
        Fuel fuel = (Fuel) o;
        return Float.compare(litter, fuel.litter) == 0 && Float.compare(price, fuel.price) == 0 && Objects.equals(id, fuel.id) && Objects.equals(latestFuel, fuel.latestFuel) && Objects.equals(km, fuel.km) && Objects.equals(fuelType, fuel.fuelType) && Objects.equals(vehicle, fuel.vehicle);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, latestFuel, litter, price, km, fuelType, vehicle);
    }
}
