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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "plan")
@Entity(name = "Plan")
public class Plan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "days", nullable = false)
    private int days;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "amount_vehicles", nullable = false)
    private int amountVehicles;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "feature_id")
    private Feature feature;

    public Plan() {
    }

    public Plan(Long id, String name, int days, double price, int amountVehicles, Feature feature) {
        this.id = id;
        this.name = name;
        this.days = days;
        this.price = price;
        this.amountVehicles = amountVehicles;
        this.feature = feature;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getAmountVehicles() {
        return amountVehicles;
    }

    public void setAmountVehicles(int amountVehicles) {
        this.amountVehicles = amountVehicles;
    }

    public Feature getFeature() {
        return feature;
    }

    public void setFeature(Feature feature) {
        this.feature = feature;
    }
}
