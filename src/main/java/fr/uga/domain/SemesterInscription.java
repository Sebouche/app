package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * Entity association of a student and a semester he paid for
 */
@ApiModel(description = "Entity association of a student and a semester he paid for")
@Entity
@Table(name = "semester_inscription")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SemesterInscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "noted", nullable = false)
    private Boolean noted;

    @Column(name = "note_max")
    private Integer noteMax;

    @Column(name = "note_given")
    private Integer noteGiven;

    /**
     * if the semester is paid by the student
     */
    @NotNull
    @ApiModelProperty(value = "if the semester is paid by the student", required = true)
    @Column(name = "paid", nullable = false)
    private Boolean paid;

    @ManyToOne
    @JsonIgnoreProperties(value = "semesterInscriptions", allowSetters = true)
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties(value = "semesterInscriptions", allowSetters = true)
    private Semester semester;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isNoted() {
        return noted;
    }

    public SemesterInscription noted(Boolean noted) {
        this.noted = noted;
        return this;
    }

    public void setNoted(Boolean noted) {
        this.noted = noted;
    }

    public Integer getNoteMax() {
        return noteMax;
    }

    public SemesterInscription noteMax(Integer noteMax) {
        this.noteMax = noteMax;
        return this;
    }

    public void setNoteMax(Integer noteMax) {
        this.noteMax = noteMax;
    }

    public Integer getNoteGiven() {
        return noteGiven;
    }

    public SemesterInscription noteGiven(Integer noteGiven) {
        this.noteGiven = noteGiven;
        return this;
    }

    public void setNoteGiven(Integer noteGiven) {
        this.noteGiven = noteGiven;
    }

    public Boolean isPaid() {
        return paid;
    }

    public SemesterInscription paid(Boolean paid) {
        this.paid = paid;
        return this;
    }

    public void setPaid(Boolean paid) {
        this.paid = paid;
    }

    public Student getStudent() {
        return student;
    }

    public SemesterInscription student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Semester getSemester() {
        return semester;
    }

    public SemesterInscription semester(Semester semester) {
        this.semester = semester;
        return this;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SemesterInscription)) {
            return false;
        }
        return id != null && id.equals(((SemesterInscription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SemesterInscription{" +
            "id=" + getId() +
            ", noted='" + isNoted() + "'" +
            ", noteMax=" + getNoteMax() +
            ", noteGiven=" + getNoteGiven() +
            ", paid='" + isPaid() + "'" +
            "}";
    }
}
