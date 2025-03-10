package kafka.system.br.AutoFrota.model;

import jakarta.persistence.*;

import java.util.Objects;

@Table(name = "external_image")
@Entity(name = "ExternalImage")
public class ExternalImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "external_image_id")
    private Long id;

    @Column(name = "left_image", nullable = false, length = 255)
    private String leftImage;

    @Column(name = "rear_image", nullable = false, length = 255)
    private String rearImage;

    @Column(name = "right_image", nullable = false, length = 255)
    private String rightImage;

    @Column(name = "front_image", nullable = false, length = 255)
    private String frontImage;

    public ExternalImage() {
    }

    public ExternalImage(Long id, String leftImage, String rearImage, String rightImage, String frontImage) {
        this.id = id;
        this.leftImage = leftImage;
        this.rearImage = rearImage;
        this.rightImage = rightImage;
        this.frontImage = frontImage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeftImage() {
        return leftImage;
    }

    public void setLeftImage(String leftImage) {
        this.leftImage = leftImage;
    }

    public String getRearImage() {
        return rearImage;
    }

    public void setRearImage(String rearImage) {
        this.rearImage = rearImage;
    }

    public String getRightImage() {
        return rightImage;
    }

    public void setRightImage(String rightImage) {
        this.rightImage = rightImage;
    }

    public String getFrontImage() {
        return frontImage;
    }

    public void setFrontImage(String frontImage) {
        this.frontImage = frontImage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExternalImage that = (ExternalImage) o;
        return Objects.equals(id, that.id) && Objects.equals(leftImage, that.leftImage) && Objects.equals(rearImage, that.rearImage) && Objects.equals(rightImage, that.rightImage) && Objects.equals(frontImage, that.frontImage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, leftImage, rearImage, rightImage, frontImage);
    }
}
