package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import fr.uga.domain.enumeration.SportLevel;

import fr.uga.domain.enumeration.MeetingPlace;

/**
 * Student entity
 */
@ApiModel(description = "Student entity")
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "sport_level")
    private SportLevel sportLevel;

    @NotNull
    @Column(name = "driving_licence", nullable = false)
    private Boolean drivingLicence;

    /**
     * the place the student accept to depart to the activities
     */
    @ApiModelProperty(value = "the place the student accept to depart to the activities")
    @Enumerated(EnumType.STRING)
    @Column(name = "meeting_place")
    private MeetingPlace meetingPlace;

    @OneToOne()
    @JoinColumn(unique = true)
    private User internalUser;

    @OneToMany(mappedBy = "student")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SemesterInscription> semesterInscriptions = new HashSet<>();

    @OneToMany(mappedBy = "student")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<StudentActivity> studentActivities = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "students", allowSetters = true)
    private Cursus cursus;

    @ManyToMany(mappedBy = "students")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Material> materials = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SportLevel getSportLevel() {
        return sportLevel;
    }

    public Student sportLevel(SportLevel sportLevel) {
        this.sportLevel = sportLevel;
        return this;
    }

    public void setSportLevel(SportLevel sportLevel) {
        this.sportLevel = sportLevel;
    }

    public Boolean isDrivingLicence() {
        return drivingLicence;
    }

    public Student drivingLicence(Boolean drivingLicence) {
        this.drivingLicence = drivingLicence;
        return this;
    }

    public void setDrivingLicence(Boolean drivingLicence) {
        this.drivingLicence = drivingLicence;
    }

    public MeetingPlace getMeetingPlace() {
        return meetingPlace;
    }

    public Student meetingPlace(MeetingPlace meetingPlace) {
        this.meetingPlace = meetingPlace;
        return this;
    }

    public void setMeetingPlace(MeetingPlace meetingPlace) {
        this.meetingPlace = meetingPlace;
    }

    public User getInternalUser() {
        return internalUser;
    }

    public Student internalUser(User user) {
        this.internalUser = user;
        return this;
    }

    public void setInternalUser(User user) {
        this.internalUser = user;
    }

    public Set<SemesterInscription> getSemesterInscriptions() {
        return semesterInscriptions;
    }

    public Student semesterInscriptions(Set<SemesterInscription> semesterInscriptions) {
        this.semesterInscriptions = semesterInscriptions;
        return this;
    }

    public Student addSemesterInscription(SemesterInscription semesterInscription) {
        this.semesterInscriptions.add(semesterInscription);
        semesterInscription.setStudent(this);
        return this;
    }

    public Student removeSemesterInscription(SemesterInscription semesterInscription) {
        this.semesterInscriptions.remove(semesterInscription);
        semesterInscription.setStudent(null);
        return this;
    }

    public void setSemesterInscriptions(Set<SemesterInscription> semesterInscriptions) {
        this.semesterInscriptions = semesterInscriptions;
    }

    public Set<StudentActivity> getStudentActivities() {
        return studentActivities;
    }

    public Student studentActivities(Set<StudentActivity> studentActivities) {
        this.studentActivities = studentActivities;
        return this;
    }

    public Student addStudentActivity(StudentActivity studentActivity) {
        this.studentActivities.add(studentActivity);
        studentActivity.setStudent(this);
        return this;
    }

    public Student removeStudentActivity(StudentActivity studentActivity) {
        this.studentActivities.remove(studentActivity);
        studentActivity.setStudent(null);
        return this;
    }

    public void setStudentActivities(Set<StudentActivity> studentActivities) {
        this.studentActivities = studentActivities;
    }

    public Cursus getCursus() {
        return cursus;
    }

    public Student cursus(Cursus cursus) {
        this.cursus = cursus;
        return this;
    }

    public void setCursus(Cursus cursus) {
        this.cursus = cursus;
    }

    public Set<Material> getMaterials() {
        return materials;
    }

    public Student materials(Set<Material> materials) {
        this.materials = materials;
        return this;
    }

    public Student addMaterial(Material material) {
        this.materials.add(material);
        material.getStudents().add(this);
        return this;
    }

    public Student removeMaterial(Material material) {
        this.materials.remove(material);
        material.getStudents().remove(this);
        return this;
    }

    public void setMaterials(Set<Material> materials) {
        this.materials = materials;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Student)) {
            return false;
        }
        return id != null && id.equals(((Student) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", sportLevel='" + getSportLevel() + "'" +
            ", drivingLicence='" + isDrivingLicence() + "'" +
            ", meetingPlace='" + getMeetingPlace() + "'" +
            "}";
    }
}
