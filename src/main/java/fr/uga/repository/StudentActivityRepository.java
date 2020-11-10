package fr.uga.repository;

import fr.uga.domain.StudentActivity;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the StudentActivity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentActivityRepository extends JpaRepository<StudentActivity, Long> {
}
