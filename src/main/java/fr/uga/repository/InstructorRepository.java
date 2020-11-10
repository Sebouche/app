package fr.uga.repository;

import fr.uga.domain.Instructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Instructor entity.
 */
@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    @Query(value = "select distinct instructor from Instructor instructor left join fetch instructor.participateActivities left join fetch instructor.editableActivities",
        countQuery = "select count(distinct instructor) from Instructor instructor")
    Page<Instructor> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct instructor from Instructor instructor left join fetch instructor.participateActivities left join fetch instructor.editableActivities")
    List<Instructor> findAllWithEagerRelationships();

    @Query("select instructor from Instructor instructor left join fetch instructor.participateActivities left join fetch instructor.editableActivities where instructor.id =:id")
    Optional<Instructor> findOneWithEagerRelationships(@Param("id") Long id);
}
