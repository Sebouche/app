package fr.uga.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import fr.uga.domain.enumeration.Composant;

/**
 * Cursus entity
 */
@ApiModel(description = "Cursus entity")
@Entity
@Table(name = "cursus")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cursus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "composant", nullable = false)
    private Composant composant;

    @NotNull
    @Min(value = 0)
    @Column(name = "academic_level", nullable = false)
    private Integer academicLevel;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Composant getComposant() {
        return composant;
    }

    public Cursus composant(Composant composant) {
        this.composant = composant;
        return this;
    }

    public void setComposant(Composant composant) {
        this.composant = composant;
    }

    public Integer getAcademicLevel() {
        return academicLevel;
    }

    public Cursus academicLevel(Integer academicLevel) {
        this.academicLevel = academicLevel;
        return this;
    }

    public void setAcademicLevel(Integer academicLevel) {
        this.academicLevel = academicLevel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cursus)) {
            return false;
        }
        return id != null && id.equals(((Cursus) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cursus{" +
            "id=" + getId() +
            ", composant='" + getComposant() + "'" +
            ", academicLevel=" + getAcademicLevel() +
            "}";
    }
}
