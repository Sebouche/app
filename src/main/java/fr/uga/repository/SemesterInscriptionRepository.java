package fr.uga.repository;

import fr.uga.domain.SemesterInscription;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SemesterInscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SemesterInscriptionRepository extends JpaRepository<SemesterInscription, Long> {
}
