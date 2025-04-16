package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Table(name = "Fuel")
@Entity(name = "Fuel")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
}
