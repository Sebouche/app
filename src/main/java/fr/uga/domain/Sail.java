package fr.uga.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import fr.uga.domain.enumeration.SportLevel;

/**
 * Sail entity
 */
@ApiModel(description = "Sail entity")
@Entity
@Table(name = "sail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "sail_id", nullable = false)
    private String sailId;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "area", nullable = false)
    private Float area;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private SportLevel level;

    @NotNull
    @Column(name = "usable", nullable = false)
    private Boolean usable;

    @Lob
    @Column(name = "comment")
    private String comment;

    @OneToMany(mappedBy = "sail")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Material> materials = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSailId() {
        return sailId;
    }

    public Sail sailId(String sailId) {
        this.sailId = sailId;
        return this;
    }

    public void setSailId(String sailId) {
        this.sailId = sailId;
    }

    public String getName() {
        return name;
    }

    public Sail name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getArea() {
        return area;
    }

    public Sail area(Float area) {
        this.area = area;
        return this;
    }

    public void setArea(Float area) {
        this.area = area;
    }

    public SportLevel getLevel() {
        return level;
    }

    public Sail level(SportLevel level) {
        this.level = level;
        return this;
    }

    public void setLevel(SportLevel level) {
        this.level = level;
    }

    public Boolean isUsable() {
        return usable;
    }

    public Sail usable(Boolean usable) {
        this.usable = usable;
        return this;
    }

    public void setUsable(Boolean usable) {
        this.usable = usable;
    }

    public String getComment() {
        return comment;
    }

    public Sail comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Set<Material> getMaterials() {
        return materials;
    }

    public Sail materials(Set<Material> materials) {
        this.materials = materials;
        return this;
    }

    public Sail addMaterial(Material material) {
        this.materials.add(material);
        material.setSail(this);
        return this;
    }

    public Sail removeMaterial(Material material) {
        this.materials.remove(material);
        material.setSail(null);
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
        if (!(o instanceof Sail)) {
            return false;
        }
        return id != null && id.equals(((Sail) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sail{" +
            "id=" + getId() +
            ", sailId='" + getSailId() + "'" +
            ", name='" + getName() + "'" +
            ", area=" + getArea() +
            ", level='" + getLevel() + "'" +
            ", usable='" + isUsable() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
