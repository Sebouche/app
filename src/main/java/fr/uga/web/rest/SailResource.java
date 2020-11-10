package fr.uga.web.rest;

import fr.uga.domain.Sail;
import fr.uga.repository.SailRepository;
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
 * REST controller for managing {@link fr.uga.domain.Sail}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SailResource {

    private final Logger log = LoggerFactory.getLogger(SailResource.class);

    private static final String ENTITY_NAME = "sail";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SailRepository sailRepository;

    public SailResource(SailRepository sailRepository) {
        this.sailRepository = sailRepository;
    }

    /**
     * {@code POST  /sails} : Create a new sail.
     *
     * @param sail the sail to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sail, or with status {@code 400 (Bad Request)} if the sail has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sails")
    public ResponseEntity<Sail> createSail(@Valid @RequestBody Sail sail) throws URISyntaxException {
        log.debug("REST request to save Sail : {}", sail);
        if (sail.getId() != null) {
            throw new BadRequestAlertException("A new sail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sail result = sailRepository.save(sail);
        return ResponseEntity.created(new URI("/api/sails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sails} : Updates an existing sail.
     *
     * @param sail the sail to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sail,
     * or with status {@code 400 (Bad Request)} if the sail is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sail couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sails")
    public ResponseEntity<Sail> updateSail(@Valid @RequestBody Sail sail) throws URISyntaxException {
        log.debug("REST request to update Sail : {}", sail);
        if (sail.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sail result = sailRepository.save(sail);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sail.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sails} : get all the sails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sails in body.
     */
    @GetMapping("/sails")
    public List<Sail> getAllSails() {
        log.debug("REST request to get all Sails");
        return sailRepository.findAll();
    }

    /**
     * {@code GET  /sails/:id} : get the "id" sail.
     *
     * @param id the id of the sail to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sail, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sails/{id}")
    public ResponseEntity<Sail> getSail(@PathVariable Long id) {
        log.debug("REST request to get Sail : {}", id);
        Optional<Sail> sail = sailRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sail);
    }

    /**
     * {@code DELETE  /sails/:id} : delete the "id" sail.
     *
     * @param id the id of the sail to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sails/{id}")
    public ResponseEntity<Void> deleteSail(@PathVariable Long id) {
        log.debug("REST request to delete Sail : {}", id);
        sailRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
