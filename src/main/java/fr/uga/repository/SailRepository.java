package fr.uga.repository;

import fr.uga.domain.Sail;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Sail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SailRepository extends JpaRepository<Sail, Long> {
}
