package fr.uga.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * Semester entity
 */
@ApiModel(description = "Semester entity")
@Entity
@Table(name = "semester")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Semester implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @OneToMany(mappedBy = "semester")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SemesterInscription> semesterInscriptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Semester startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Semester endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Set<SemesterInscription> getSemesterInscriptions() {
        return semesterInscriptions;
    }

    public Semester semesterInscriptions(Set<SemesterInscription> semesterInscriptions) {
        this.semesterInscriptions = semesterInscriptions;
        return this;
    }

    public Semester addSemesterInscription(SemesterInscription semesterInscription) {
        this.semesterInscriptions.add(semesterInscription);
        semesterInscription.setSemester(this);
        return this;
    }

    public Semester removeSemesterInscription(SemesterInscription semesterInscription) {
        this.semesterInscriptions.remove(semesterInscription);
        semesterInscription.setSemester(null);
        return this;
    }

    public void setSemesterInscriptions(Set<SemesterInscription> semesterInscriptions) {
        this.semesterInscriptions = semesterInscriptions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Semester)) {
            return false;
        }
        return id != null && id.equals(((Semester) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Semester{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
