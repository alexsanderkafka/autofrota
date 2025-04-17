package kafka.system.br.AutoFrota.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "feature")
@Entity(name = "Feature")
public class Feature {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "suport", nullable = false)
    private boolean suport;

    @Column(name = "dashboard", nullable = false)
    private boolean dashboard;

    @Column(name = "notify", nullable = false)
    private boolean notify;

    @Column(name = "manage_vehicles", nullable = false)
    private boolean manageVehicle;

    @Column(name = "reports", nullable = false)
    private boolean checklist;

    public Feature() {
    }

    public Feature(Long id, boolean suport, boolean dashboard, boolean notify, boolean manageVehicle, boolean checklist) {
        this.id = id;
        this.suport = suport;
        this.dashboard = dashboard;
        this.notify = notify;
        this.manageVehicle = manageVehicle;
        this.checklist = checklist;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isSuport() {
        return suport;
    }

    public void setSuport(boolean suport) {
        this.suport = suport;
    }

    public boolean isDashboard() {
        return dashboard;
    }

    public void setDashboard(boolean dashboard) {
        this.dashboard = dashboard;
    }

    public boolean isNotify() {
        return notify;
    }

    public void setNotify(boolean notify) {
        this.notify = notify;
    }

    public boolean isManageVehicle() {
        return manageVehicle;
    }

    public void setManageVehicle(boolean manageVehicle) {
        this.manageVehicle = manageVehicle;
    }

    public boolean isChecklist() {
        return checklist;
    }

    public void setChecklist(boolean checklist) {
        this.checklist = checklist;
    }
}
