package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;

import java.util.Objects;

@Table(name = "vehicle_characteristic")
@Entity(name = "VehicleCharacteristic")
public class VehicleCharacteristic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "vehicle_characteristic_id")
    private Long id;

    @Column(name = "vehicle_type", nullable = false, length = 100)
    private String vehicleType;

    @Column(name = "fuel_type", nullable = false, length = 50)
    private String fuelType;

    @Column(name = "status", nullable = false)
    private boolean status;

    @Column(name = "current_km", nullable = false, length = 255)
    private String currentKm;

    @Column(name = "color", nullable = false, length = 100)
    private String color;

    @Column(name = "chassi_number", nullable = false, length = 255)
    private String chassiNumber;

    @Column(name = "renavam", nullable = false, length = 255)
    private String renavam;

    @Column(name = "engine_liter", nullable = false)
    private float engineLiter;

    @Column(name = "average_consume", nullable = false)
    private float avgConsume;

    public VehicleCharacteristic() {
    }

    public VehicleCharacteristic(Long id, String vehicleType, String fuelType, boolean status, String currentKm, String color, String chassiNumber, String renavam, float engineLiter, float avgConsume) {
        this.id = id;
        this.vehicleType = vehicleType;
        this.fuelType = fuelType;
        this.status = status;
        this.currentKm = currentKm;
        this.color = color;
        this.chassiNumber = chassiNumber;
        this.renavam = renavam;
        this.engineLiter = engineLiter;
        this.avgConsume = avgConsume;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getCurrentKm() {
        return currentKm;
    }

    public void setCurrentKm(String currentKm) {
        this.currentKm = currentKm;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getChassiNumber() {
        return chassiNumber;
    }

    public void setChassiNumber(String chassiNumber) {
        this.chassiNumber = chassiNumber;
    }

    public String getRenavam() {
        return renavam;
    }

    public void setRenavam(String renavam) {
        this.renavam = renavam;
    }

    public float getEngineLiter() {
        return engineLiter;
    }

    public void setEngineLiter(float engineLiter) {
        this.engineLiter = engineLiter;
    }

    public float getAvgConsume() {
        return avgConsume;
    }

    public void setAvgConsume(float avgConsume) {
        this.avgConsume = avgConsume;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VehicleCharacteristic that = (VehicleCharacteristic) o;
        return status == that.status && Float.compare(engineLiter, that.engineLiter) == 0 && Float.compare(avgConsume, that.avgConsume) == 0 && Objects.equals(id, that.id) && Objects.equals(vehicleType, that.vehicleType) && Objects.equals(fuelType, that.fuelType) && Objects.equals(currentKm, that.currentKm) && Objects.equals(color, that.color) && Objects.equals(chassiNumber, that.chassiNumber) && Objects.equals(renavam, that.renavam);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, vehicleType, fuelType, status, currentKm, color, chassiNumber, renavam, engineLiter, avgConsume);
    }
}
