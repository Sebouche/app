package fr.uga.repository;

import fr.uga.domain.Tracksuit;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Tracksuit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TracksuitRepository extends JpaRepository<Tracksuit, Long> {
}
