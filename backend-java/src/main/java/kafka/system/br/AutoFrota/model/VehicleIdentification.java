package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Table(name = "vehicle_identification")
@Entity(name = "VehicleIdentification")
public class VehicleIdentification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "vehicle_identification_id")
    private Long id;

    @Column(name = "plate", nullable = false, length = 30)
    private String plate;

    @Column(name = "brand", nullable = false, length = 255)
    private String brand;

    @Column(name = "model", nullable = false, length = 255)
    private String model;

    @Column(name = "year", nullable = false, length = 100)
    private String year;

    @Column(name = "image_perfil", nullable = false, length = 255)
    private String imagePerfil;

    @Column(name = "vehicle_code", length = 100)
    private String vehicleCode;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_characteristic_id")
    private VehicleCharacteristic characteristic;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "external_image_id")
    private ExternalImage externalImage;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "internal_image_id")
    private InternalImage InternalImage;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "business_id")
    private Business business;

    public VehicleIdentification() {
    }

    public VehicleIdentification(Long id, String plate, String brand, String model, String year, String imagePerfil, String vehicleCode, VehicleCharacteristic characteristic, ExternalImage externalImage, kafka.system.br.AutoFrota.model.InternalImage internalImage, Business business) {
        this.id = id;
        this.plate = plate;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.imagePerfil = imagePerfil;
        this.vehicleCode = vehicleCode;
        this.characteristic = characteristic;
        this.externalImage = externalImage;
        InternalImage = internalImage;
        this.business = business;
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

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getImagePerfil() {
        return imagePerfil;
    }

    public void setImagePerfil(String imagePerfil) {
        this.imagePerfil = imagePerfil;
    }

    public String getVehicleCode() {
        return vehicleCode;
    }

    public void setVehicleCode(String vehicleCode) {
        this.vehicleCode = vehicleCode;
    }

    public VehicleCharacteristic getCharacteristic() {
        return characteristic;
    }

    public void setCharacteristic(VehicleCharacteristic characteristic) {
        this.characteristic = characteristic;
    }

    public ExternalImage getExternalImage() {
        return externalImage;
    }

    public void setExternalImage(ExternalImage externalImage) {
        this.externalImage = externalImage;
    }

    public kafka.system.br.AutoFrota.model.InternalImage getInternalImage() {
        return InternalImage;
    }

    public void setInternalImage(kafka.system.br.AutoFrota.model.InternalImage internalImage) {
        InternalImage = internalImage;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VehicleIdentification that = (VehicleIdentification) o;
        return Objects.equals(id, that.id) && Objects.equals(plate, that.plate) && Objects.equals(brand, that.brand) && Objects.equals(model, that.model) && Objects.equals(year, that.year) && Objects.equals(imagePerfil, that.imagePerfil) && Objects.equals(vehicleCode, that.vehicleCode) && Objects.equals(characteristic, that.characteristic) && Objects.equals(externalImage, that.externalImage) && Objects.equals(InternalImage, that.InternalImage) && Objects.equals(business, that.business);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, plate, brand, model, year, imagePerfil, vehicleCode, characteristic, externalImage, InternalImage, business);
    }
}
