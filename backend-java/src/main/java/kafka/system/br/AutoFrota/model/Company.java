package kafka.system.br.AutoFrota.model;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Table(name = "company")
@Entity(name = "Company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "company_id")
    private Long id;

    @UuidGenerator(style = UuidGenerator.Style.AUTO)
    @Column(name = "external_id", nullable = false, unique = true, updatable = false)
    private String externalId;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "social", nullable = true, length = 30)
    private String social;

    @Column(name = "phone", nullable = false, length = 50)
    private String phone;

    @Column(name = "zip_code", nullable = false, length = 30)
    private String zipCode;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private ProfileImage profileImage;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "login_id")
    private Login login;

    public Company() {
    }

    public Company(Login login, ProfileImage profileImage, String address, String zipCode, String phone, String social, String name, Long id) {
        this.login = login;
        this.profileImage = profileImage;
        this.address = address;
        this.zipCode = zipCode;
        this.phone = phone;
        this.social = social;
        this.name = name;
        this.id = id;
    }

    public Company(Login login, ProfileImage profileImage, String address, String zipCode, String phone, String social, String name) {
        this.login = login;
        this.profileImage = profileImage;
        this.address = address;
        this.zipCode = zipCode;
        this.phone = phone;
        this.social = social;
        this.name = name;
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

    public String getSocial() {
        return social;
    }

    public void setSocial(String social) {
        this.social = social;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ProfileImage getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(ProfileImage profileImage) {
        this.profileImage = profileImage;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }
}
