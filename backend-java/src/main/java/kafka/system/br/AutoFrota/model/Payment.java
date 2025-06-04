package kafka.system.br.AutoFrota.model;

import java.util.Date;

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

@Table(name = "payment")
@Entity(name = "Payment")
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "payment_id")
    private Long id;

    @Column(name = "collector_id", nullable = true)
    private String collectorId;

    @Column(name = "payment_id", nullable = true)
    private String paymentId;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "external_reference", nullable = true)
    private String externalReference;

    @Column(name = "payment_type", nullable = true)
    private String paymentType;

    @Column(name = "processing_mode", nullable = true)
    private String processingMode;

    @Column(name = "merchant_account_id", nullable = true)
    private String merchantAccountId;

    @Column(name = "confirmed_date_payment", nullable = true)
    private Date confirmedDatePayment;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    private Company company;

    public Payment() {
    }

    public Payment(Long id, String collectorId, String paymentId, String status, String externalReference, String paymentType, String processingMode, String merchantAccountId, Date confirmedDatePayment, Plan plan, Company company) {
        this.id = id;
        this.collectorId = collectorId;
        this.paymentId = paymentId;
        this.status = status;
        this.externalReference = externalReference;
        this.paymentType = paymentType;
        this.processingMode = processingMode;
        this.merchantAccountId = merchantAccountId;
        this.confirmedDatePayment = confirmedDatePayment;
        this.plan = plan;
        this.company = company;
    }

    public Payment(String status, Plan plan, Company company) {
        this.collectorId = null;
        this.paymentId = null;
        this.status = status;
        this.externalReference = null;
        this.paymentType = null;
        this.processingMode = null;
        this.merchantAccountId = null;
        this.confirmedDatePayment = null;
        this.plan = plan;
        this.company = company;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCollectorId() {
        return collectorId;
    }

    public void setCollectorId(String collectorId) {
        this.collectorId = collectorId;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getExternalRefence() {
        return externalReference;
    }

    public void setExternalRefence(String externalRefence) {
        this.externalReference = externalRefence;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getProcessingMode() {
        return processingMode;
    }

    public void setProcessingMode(String processingMode) {
        this.processingMode = processingMode;
    }

    public String getMerchantAccountId() {
        return merchantAccountId;
    }

    public void setMerchantAccountId(String merchantAccountId) {
        this.merchantAccountId = merchantAccountId;
    }

    public Date getConfirmedDatePayment() {
        return confirmedDatePayment;
    }

    public void setConfirmedDatePayment(Date confirmedDatePayment) {
        this.confirmedDatePayment = confirmedDatePayment;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
