package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import fr.uga.domain.enumeration.Lakes;

/**
 * Activity entity
 */
@ApiModel(description = "Activity entity")
@Entity
@Table(name = "activity")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Activity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    /**
     * the place the activity takes place in
     */
    @ApiModelProperty(value = "the place the activity takes place in")
    @Column(name = "place")
    private String place;

    /**
     * number of student acceptable
     */
    @Min(value = 0)
    @ApiModelProperty(value = "number of student acceptable")
    @Column(name = "capacity")
    private Integer capacity;

    @NotNull
    @Column(name = "inscription_open", nullable = false)
    private Boolean inscriptionOpen;

    @DecimalMin(value = "0")
    @DecimalMax(value = "1")
    @Column(name = "coeff")
    private Float coeff;

    /**
     * the name of lake in particular
     */
    @ApiModelProperty(value = "the name of lake in particular")
    @Enumerated(EnumType.STRING)
    @Column(name = "lake")
    private Lakes lake;

    @OneToMany(mappedBy = "activity")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<StudentActivity> studentActivities = new HashSet<>();

    @ManyToMany(mappedBy = "participateActivities")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Instructor> monitors = new HashSet<>();

    @ManyToMany(mappedBy = "editableActivities")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Instructor> managers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Activity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public Activity date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getPlace() {
        return place;
    }

    public Activity place(String place) {
        this.place = place;
        return this;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Activity capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Boolean isInscriptionOpen() {
        return inscriptionOpen;
    }

    public Activity inscriptionOpen(Boolean inscriptionOpen) {
        this.inscriptionOpen = inscriptionOpen;
        return this;
    }

    public void setInscriptionOpen(Boolean inscriptionOpen) {
        this.inscriptionOpen = inscriptionOpen;
    }

    public Float getCoeff() {
        return coeff;
    }

    public Activity coeff(Float coeff) {
        this.coeff = coeff;
        return this;
    }

    public void setCoeff(Float coeff) {
        this.coeff = coeff;
    }

    public Lakes getLake() {
        return lake;
    }

    public Activity lake(Lakes lake) {
        this.lake = lake;
        return this;
    }

    public void setLake(Lakes lake) {
        this.lake = lake;
    }

    public Set<StudentActivity> getStudentActivities() {
        return studentActivities;
    }

    public Activity studentActivities(Set<StudentActivity> studentActivities) {
        this.studentActivities = studentActivities;
        return this;
    }

    public Activity addStudentActivity(StudentActivity studentActivity) {
        this.studentActivities.add(studentActivity);
        studentActivity.setActivity(this);
        return this;
    }

    public Activity removeStudentActivity(StudentActivity studentActivity) {
        this.studentActivities.remove(studentActivity);
        studentActivity.setActivity(null);
        return this;
    }

    public void setStudentActivities(Set<StudentActivity> studentActivities) {
        this.studentActivities = studentActivities;
    }

    public Set<Instructor> getMonitors() {
        return monitors;
    }

    public Activity monitors(Set<Instructor> instructors) {
        this.monitors = instructors;
        return this;
    }

    public Activity addMonitors(Instructor instructor) {
        this.monitors.add(instructor);
        instructor.getParticipateActivities().add(this);
        return this;
    }

    public Activity removeMonitors(Instructor instructor) {
        this.monitors.remove(instructor);
        instructor.getParticipateActivities().remove(this);
        return this;
    }

    public void setMonitors(Set<Instructor> instructors) {
        this.monitors = instructors;
    }

    public Set<Instructor> getManagers() {
        return managers;
    }

    public Activity managers(Set<Instructor> instructors) {
        this.managers = instructors;
        return this;
    }

    public Activity addManagers(Instructor instructor) {
        this.managers.add(instructor);
        instructor.getEditableActivities().add(this);
        return this;
    }

    public Activity removeManagers(Instructor instructor) {
        this.managers.remove(instructor);
        instructor.getEditableActivities().remove(this);
        return this;
    }

    public void setManagers(Set<Instructor> instructors) {
        this.managers = instructors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Activity)) {
            return false;
        }
        return id != null && id.equals(((Activity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Activity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", date='" + getDate() + "'" +
            ", place='" + getPlace() + "'" +
            ", capacity=" + getCapacity() +
            ", inscriptionOpen='" + isInscriptionOpen() + "'" +
            ", coeff=" + getCoeff() +
            ", lake='" + getLake() + "'" +
            "}";
    }
}
