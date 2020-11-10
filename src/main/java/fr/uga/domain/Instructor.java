package fr.uga.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Instructor entity
 */
@ApiModel(description = "Instructor entity")
@Entity
@Table(name = "instructor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Instructor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User internalUser;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "instructor_participate_activity",
               joinColumns = @JoinColumn(name = "instructor_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "participate_activity_id", referencedColumnName = "id"))
    private Set<Activity> participateActivities = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "instructor_editable_activity",
               joinColumns = @JoinColumn(name = "instructor_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "editable_activity_id", referencedColumnName = "id"))
    private Set<Activity> editableActivities = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getInternalUser() {
        return internalUser;
    }

    public Instructor internalUser(User user) {
        this.internalUser = user;
        return this;
    }

    public void setInternalUser(User user) {
        this.internalUser = user;
    }

    public Set<Activity> getParticipateActivities() {
        return participateActivities;
    }

    public Instructor participateActivities(Set<Activity> activities) {
        this.participateActivities = activities;
        return this;
    }

    public Instructor addParticipateActivity(Activity activity) {
        this.participateActivities.add(activity);
        activity.getMonitors().add(this);
        return this;
    }

    public Instructor removeParticipateActivity(Activity activity) {
        this.participateActivities.remove(activity);
        activity.getMonitors().remove(this);
        return this;
    }

    public void setParticipateActivities(Set<Activity> activities) {
        this.participateActivities = activities;
    }

    public Set<Activity> getEditableActivities() {
        return editableActivities;
    }

    public Instructor editableActivities(Set<Activity> activities) {
        this.editableActivities = activities;
        return this;
    }

    public Instructor addEditableActivity(Activity activity) {
        this.editableActivities.add(activity);
        activity.getManagers().add(this);
        return this;
    }

    public Instructor removeEditableActivity(Activity activity) {
        this.editableActivities.remove(activity);
        activity.getManagers().remove(this);
        return this;
    }

    public void setEditableActivities(Set<Activity> activities) {
        this.editableActivities = activities;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Instructor)) {
            return false;
        }
        return id != null && id.equals(((Instructor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Instructor{" +
            "id=" + getId() +
            "}";
    }
}
