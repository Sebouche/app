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
 * Board entity
 */
@ApiModel(description = "Board entity")
@Entity
@Table(name = "board")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Board implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "board_id", nullable = false)
    private String boardId;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "volume", nullable = false)
    private Integer volume;

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

    @OneToMany(mappedBy = "board")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Material> materials = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBoardId() {
        return boardId;
    }

    public Board boardId(String boardId) {
        this.boardId = boardId;
        return this;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public String getName() {
        return name;
    }

    public Board name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getVolume() {
        return volume;
    }

    public Board volume(Integer volume) {
        this.volume = volume;
        return this;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    public SportLevel getLevel() {
        return level;
    }

    public Board level(SportLevel level) {
        this.level = level;
        return this;
    }

    public void setLevel(SportLevel level) {
        this.level = level;
    }

    public Boolean isUsable() {
        return usable;
    }

    public Board usable(Boolean usable) {
        this.usable = usable;
        return this;
    }

    public void setUsable(Boolean usable) {
        this.usable = usable;
    }

    public String getComment() {
        return comment;
    }

    public Board comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Set<Material> getMaterials() {
        return materials;
    }

    public Board materials(Set<Material> materials) {
        this.materials = materials;
        return this;
    }

    public Board addMaterial(Material material) {
        this.materials.add(material);
        material.setBoard(this);
        return this;
    }

    public Board removeMaterial(Material material) {
        this.materials.remove(material);
        material.setBoard(null);
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
        if (!(o instanceof Board)) {
            return false;
        }
        return id != null && id.equals(((Board) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Board{" +
            "id=" + getId() +
            ", boardId='" + getBoardId() + "'" +
            ", name='" + getName() + "'" +
            ", volume=" + getVolume() +
            ", level='" + getLevel() + "'" +
            ", usable='" + isUsable() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
