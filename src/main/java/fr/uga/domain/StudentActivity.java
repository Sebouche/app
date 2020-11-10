package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * Entity association of a student and an activity he took
 */
@ApiModel(description = "Entity association of a student and an activity he took")
@Entity
@Table(name = "student_activity")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class StudentActivity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Complementary information about the student
     */
    @ApiModelProperty(value = "Complementary information about the student")
    @Lob
    @Column(name = "comment_to_intructor")
    private String commentToIntructor;

    /**
     * Comment for Student's eval
     */
    @ApiModelProperty(value = "Comment for Student's eval")
    @Lob
    @Column(name = "comment_by_instructor")
    private String commentByInstructor;

    @ManyToOne
    @JsonIgnoreProperties(value = "studentActivities", allowSetters = true)
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties(value = "studentActivities", allowSetters = true)
    private Activity activity;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommentToIntructor() {
        return commentToIntructor;
    }

    public StudentActivity commentToIntructor(String commentToIntructor) {
        this.commentToIntructor = commentToIntructor;
        return this;
    }

    public void setCommentToIntructor(String commentToIntructor) {
        this.commentToIntructor = commentToIntructor;
    }

    public String getCommentByInstructor() {
        return commentByInstructor;
    }

    public StudentActivity commentByInstructor(String commentByInstructor) {
        this.commentByInstructor = commentByInstructor;
        return this;
    }

    public void setCommentByInstructor(String commentByInstructor) {
        this.commentByInstructor = commentByInstructor;
    }

    public Student getStudent() {
        return student;
    }

    public StudentActivity student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Activity getActivity() {
        return activity;
    }

    public StudentActivity activity(Activity activity) {
        this.activity = activity;
        return this;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentActivity)) {
            return false;
        }
        return id != null && id.equals(((StudentActivity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentActivity{" +
            "id=" + getId() +
            ", commentToIntructor='" + getCommentToIntructor() + "'" +
            ", commentByInstructor='" + getCommentByInstructor() + "'" +
            "}";
    }
}
