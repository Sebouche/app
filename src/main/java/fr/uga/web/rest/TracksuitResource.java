package fr.uga.web.rest;

import fr.uga.domain.Tracksuit;
import fr.uga.repository.TracksuitRepository;
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
 * REST controller for managing {@link fr.uga.domain.Tracksuit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TracksuitResource {

    private final Logger log = LoggerFactory.getLogger(TracksuitResource.class);

    private static final String ENTITY_NAME = "tracksuit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TracksuitRepository tracksuitRepository;

    public TracksuitResource(TracksuitRepository tracksuitRepository) {
        this.tracksuitRepository = tracksuitRepository;
    }

    /**
     * {@code POST  /tracksuits} : Create a new tracksuit.
     *
     * @param tracksuit the tracksuit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tracksuit, or with status {@code 400 (Bad Request)} if the tracksuit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tracksuits")
    public ResponseEntity<Tracksuit> createTracksuit(@Valid @RequestBody Tracksuit tracksuit) throws URISyntaxException {
        log.debug("REST request to save Tracksuit : {}", tracksuit);
        if (tracksuit.getId() != null) {
            throw new BadRequestAlertException("A new tracksuit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tracksuit result = tracksuitRepository.save(tracksuit);
        return ResponseEntity.created(new URI("/api/tracksuits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tracksuits} : Updates an existing tracksuit.
     *
     * @param tracksuit the tracksuit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tracksuit,
     * or with status {@code 400 (Bad Request)} if the tracksuit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tracksuit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tracksuits")
    public ResponseEntity<Tracksuit> updateTracksuit(@Valid @RequestBody Tracksuit tracksuit) throws URISyntaxException {
        log.debug("REST request to update Tracksuit : {}", tracksuit);
        if (tracksuit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tracksuit result = tracksuitRepository.save(tracksuit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tracksuit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tracksuits} : get all the tracksuits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tracksuits in body.
     */
    @GetMapping("/tracksuits")
    public List<Tracksuit> getAllTracksuits() {
        log.debug("REST request to get all Tracksuits");
        return tracksuitRepository.findAll();
    }

    /**
     * {@code GET  /tracksuits/:id} : get the "id" tracksuit.
     *
     * @param id the id of the tracksuit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tracksuit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tracksuits/{id}")
    public ResponseEntity<Tracksuit> getTracksuit(@PathVariable Long id) {
        log.debug("REST request to get Tracksuit : {}", id);
        Optional<Tracksuit> tracksuit = tracksuitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tracksuit);
    }

    /**
     * {@code DELETE  /tracksuits/:id} : delete the "id" tracksuit.
     *
     * @param id the id of the tracksuit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tracksuits/{id}")
    public ResponseEntity<Void> deleteTracksuit(@PathVariable Long id) {
        log.debug("REST request to delete Tracksuit : {}", id);
        tracksuitRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
