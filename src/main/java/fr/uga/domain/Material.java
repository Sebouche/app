package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Material entity gathering equipments for an activity
 */
@ApiModel(description = "Material entity gathering equipments for an activity")
@Entity
@Table(name = "material")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "material_student",
               joinColumns = @JoinColumn(name = "material_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"))
    private Set<Student> students = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "materials", allowSetters = true)
    private Board board;

    @ManyToOne
    @JsonIgnoreProperties(value = "materials", allowSetters = true)
    private Sail sail;

    @ManyToOne
    @JsonIgnoreProperties(value = "materials", allowSetters = true)
    private Tracksuit tracksuit;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Material students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Material addStudent(Student student) {
        this.students.add(student);
        student.getMaterials().add(this);
        return this;
    }

    public Material removeStudent(Student student) {
        this.students.remove(student);
        student.getMaterials().remove(this);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public Board getBoard() {
        return board;
    }

    public Material board(Board board) {
        this.board = board;
        return this;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public Sail getSail() {
        return sail;
    }

    public Material sail(Sail sail) {
        this.sail = sail;
        return this;
    }

    public void setSail(Sail sail) {
        this.sail = sail;
    }

    public Tracksuit getTracksuit() {
        return tracksuit;
    }

    public Material tracksuit(Tracksuit tracksuit) {
        this.tracksuit = tracksuit;
        return this;
    }

    public void setTracksuit(Tracksuit tracksuit) {
        this.tracksuit = tracksuit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Material)) {
            return false;
        }
        return id != null && id.equals(((Material) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            "}";
    }
}
