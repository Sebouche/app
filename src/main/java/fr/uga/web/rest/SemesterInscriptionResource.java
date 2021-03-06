package fr.uga.web.rest;

import fr.uga.domain.SemesterInscription;
import fr.uga.repository.SemesterInscriptionRepository;
import fr.uga.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.uga.domain.SemesterInscription}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SemesterInscriptionResource {

    private final Logger log = LoggerFactory.getLogger(SemesterInscriptionResource.class);

    private static final String ENTITY_NAME = "semesterInscription";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SemesterInscriptionRepository semesterInscriptionRepository;

    public SemesterInscriptionResource(SemesterInscriptionRepository semesterInscriptionRepository) {
        this.semesterInscriptionRepository = semesterInscriptionRepository;
    }

    /**
     * {@code POST  /semester-inscriptions} : Create a new semesterInscription.
     *
     * @param semesterInscription the semesterInscription to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new semesterInscription, or with status {@code 400 (Bad Request)} if the semesterInscription has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/semester-inscriptions")
    public ResponseEntity<SemesterInscription> createSemesterInscription(@Valid @RequestBody SemesterInscription semesterInscription) throws URISyntaxException {
        log.debug("REST request to save SemesterInscription : {}", semesterInscription);
        if (semesterInscription.getId() != null) {
            throw new BadRequestAlertException("A new semesterInscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SemesterInscription result = semesterInscriptionRepository.save(semesterInscription);
        return ResponseEntity.created(new URI("/api/semester-inscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /semester-inscriptions} : Updates an existing semesterInscription.
     *
     * @param semesterInscription the semesterInscription to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated semesterInscription,
     * or with status {@code 400 (Bad Request)} if the semesterInscription is not valid,
     * or with status {@code 500 (Internal Server Error)} if the semesterInscription couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/semester-inscriptions")
    public ResponseEntity<SemesterInscription> updateSemesterInscription(@Valid @RequestBody SemesterInscription semesterInscription) throws URISyntaxException {
        log.debug("REST request to update SemesterInscription : {}", semesterInscription);
        if (semesterInscription.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SemesterInscription result = semesterInscriptionRepository.save(semesterInscription);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, semesterInscription.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /semester-inscriptions} : get all the semesterInscriptions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of semesterInscriptions in body.
     */
    @GetMapping("/semester-inscriptions")
    public List<SemesterInscription> getAllSemesterInscriptions() {
        log.debug("REST request to get all SemesterInscriptions");
        return semesterInscriptionRepository.findAll();
    }

    /**
     * {@code GET  /semester-inscriptions/:id} : get the "id" semesterInscription.
     *
     * @param id the id of the semesterInscription to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the semesterInscription, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/semester-inscriptions/{id}")
    public ResponseEntity<SemesterInscription> getSemesterInscription(@PathVariable Long id) {
        log.debug("REST request to get SemesterInscription : {}", id);
        Optional<SemesterInscription> semesterInscription = semesterInscriptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(semesterInscription);
    }

    /**
     * {@code DELETE  /semester-inscriptions/:id} : delete the "id" semesterInscription.
     *
     * @param id the id of the semesterInscription to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/semester-inscriptions/{id}")
    public ResponseEntity<Void> deleteSemesterInscription(@PathVariable Long id) {
        log.debug("REST request to delete SemesterInscription : {}", id);
        semesterInscriptionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
