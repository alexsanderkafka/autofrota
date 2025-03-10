package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Table(name = "business")
@Entity(name = "Business")
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "business_id")
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "created", nullable = false, length = 255)
    private Date created;

    @Column(name = "cnpj", nullable = false, length = 255)
    private String cnpj;

    @Column(name = "phone", nullable = false, length = 100)
    private String phone;

    public Business() {
    }

    public Business(Long id, String name, Date created, String cnpj, String phone) {
        this.id = id;
        this.name = name;
        this.created = created;
        this.cnpj = cnpj;
        this.phone = phone;
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

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Business business = (Business) o;
        return Objects.equals(id, business.id) && Objects.equals(name, business.name) && Objects.equals(created, business.created) && Objects.equals(cnpj, business.cnpj) && Objects.equals(phone, business.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, created, cnpj, phone);
    }
}
