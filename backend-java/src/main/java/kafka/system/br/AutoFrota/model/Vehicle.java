package kafka.system.br.AutoFrota.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name = "vehicle")
@Entity(name = "Vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "vehicle_id")
    private Long id;

    @Column(name = "plate", nullable = false, length = 20)
    private String plate;

    @Column(name = "brand", nullable = false, length = 100)
    private String brand;

    @Column(name = "model", nullable = false, length = 50)
    private String model;

    @Column(name = "type_fuel", nullable = false, length = 30)
    private String typeFuel;

    @Column(name = "km", nullable = false, length = 100)
    Long km;

    @Column(name = "category", nullable = false, length = 50)
    private String category;

    @Column(name = "active", nullable = false)
    private boolean active;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private VehicleImage vehicleImage;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehiclestatus_id")
    private VehicleStatus vehicleStatus;

    public Vehicle() {
    }

    public Vehicle(Long id, String plate, String brand, String model, String typeFuel, Long km, String category, boolean activate, VehicleImage vehicleImage, Company company, VehicleStatus vehicleStatus) {
        this.id = id;
        this.plate = plate;
        this.brand = brand;
        this.model = model;
        this.typeFuel = typeFuel;
        this.km = km;
        this.category = category;
        this.active = activate;
        this.vehicleImage = vehicleImage;
        this.company = company;
        this.vehicleStatus = vehicleStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getTypeFuel() {
        return typeFuel;
    }

    public void setTypeFuel(String typeFuel) {
        this.typeFuel = typeFuel;
    }

    public Long getKm() {
        return km;
    }

    public void setKm(Long km) {
        this.km = km;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public VehicleImage getVehicleImage() {
        return vehicleImage;
    }

    public void setVehicleImage(VehicleImage vehicleImage) {
        this.vehicleImage = vehicleImage;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public VehicleStatus getVehicleStatus() {
        return vehicleStatus;
    }

    public void setVehicleStatus(VehicleStatus vehicleStatus) {
        this.vehicleStatus = vehicleStatus;
    }
}
