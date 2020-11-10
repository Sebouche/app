package fr.uga.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Tracksuit entity
 */
@ApiModel(description = "Tracksuit entity")
@Entity
@Table(name = "tracksuit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Tracksuit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "tracksuit_id", nullable = false)
    private Integer tracksuitId;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Min(value = 0)
    @Column(name = "size_min", nullable = false)
    private Integer sizeMin;

    @NotNull
    @Min(value = 0)
    @Column(name = "size_max", nullable = false)
    private Integer sizeMax;

    @NotNull
    @Min(value = 0)
    @Column(name = "weight_min", nullable = false)
    private Integer weightMin;

    @NotNull
    @Min(value = 0)
    @Column(name = "weight_max", nullable = false)
    private Integer weightMax;

    @Lob
    @Column(name = "comment")
    private String comment;

    @OneToMany(mappedBy = "tracksuit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Material> materials = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTracksuitId() {
        return tracksuitId;
    }

    public Tracksuit tracksuitId(Integer tracksuitId) {
        this.tracksuitId = tracksuitId;
        return this;
    }

    public void setTracksuitId(Integer tracksuitId) {
        this.tracksuitId = tracksuitId;
    }

    public String getName() {
        return name;
    }

    public Tracksuit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSizeMin() {
        return sizeMin;
    }

    public Tracksuit sizeMin(Integer sizeMin) {
        this.sizeMin = sizeMin;
        return this;
    }

    public void setSizeMin(Integer sizeMin) {
        this.sizeMin = sizeMin;
    }

    public Integer getSizeMax() {
        return sizeMax;
    }

    public Tracksuit sizeMax(Integer sizeMax) {
        this.sizeMax = sizeMax;
        return this;
    }

    public void setSizeMax(Integer sizeMax) {
        this.sizeMax = sizeMax;
    }

    public Integer getWeightMin() {
        return weightMin;
    }

    public Tracksuit weightMin(Integer weightMin) {
        this.weightMin = weightMin;
        return this;
    }

    public void setWeightMin(Integer weightMin) {
        this.weightMin = weightMin;
    }

    public Integer getWeightMax() {
        return weightMax;
    }

    public Tracksuit weightMax(Integer weightMax) {
        this.weightMax = weightMax;
        return this;
    }

    public void setWeightMax(Integer weightMax) {
        this.weightMax = weightMax;
    }

    public String getComment() {
        return comment;
    }

    public Tracksuit comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Set<Material> getMaterials() {
        return materials;
    }

    public Tracksuit materials(Set<Material> materials) {
        this.materials = materials;
        return this;
    }

    public Tracksuit addMaterial(Material material) {
        this.materials.add(material);
        material.setTracksuit(this);
        return this;
    }

    public Tracksuit removeMaterial(Material material) {
        this.materials.remove(material);
        material.setTracksuit(null);
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
        if (!(o instanceof Tracksuit)) {
            return false;
        }
        return id != null && id.equals(((Tracksuit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tracksuit{" +
            "id=" + getId() +
            ", tracksuitId=" + getTracksuitId() +
            ", name='" + getName() + "'" +
            ", sizeMin=" + getSizeMin() +
            ", sizeMax=" + getSizeMax() +
            ", weightMin=" + getWeightMin() +
            ", weightMax=" + getWeightMax() +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
