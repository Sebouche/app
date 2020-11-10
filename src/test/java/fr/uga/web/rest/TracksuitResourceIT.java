package fr.uga.web.rest;

import fr.uga.EcomApp;
import fr.uga.domain.Tracksuit;
import fr.uga.repository.TracksuitRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TracksuitResource} REST controller.
 */
@SpringBootTest(classes = EcomApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TracksuitResourceIT {

    private static final Integer DEFAULT_TRACKSUIT_ID = 1;
    private static final Integer UPDATED_TRACKSUIT_ID = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_SIZE_MIN = 0;
    private static final Integer UPDATED_SIZE_MIN = 1;

    private static final Integer DEFAULT_SIZE_MAX = 0;
    private static final Integer UPDATED_SIZE_MAX = 1;

    private static final Integer DEFAULT_WEIGHT_MIN = 0;
    private static final Integer UPDATED_WEIGHT_MIN = 1;

    private static final Integer DEFAULT_WEIGHT_MAX = 0;
    private static final Integer UPDATED_WEIGHT_MAX = 1;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private TracksuitRepository tracksuitRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTracksuitMockMvc;

    private Tracksuit tracksuit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tracksuit createEntity(EntityManager em) {
        Tracksuit tracksuit = new Tracksuit()
            .tracksuitId(DEFAULT_TRACKSUIT_ID)
            .name(DEFAULT_NAME)
            .sizeMin(DEFAULT_SIZE_MIN)
            .sizeMax(DEFAULT_SIZE_MAX)
            .weightMin(DEFAULT_WEIGHT_MIN)
            .weightMax(DEFAULT_WEIGHT_MAX)
            .comment(DEFAULT_COMMENT);
        return tracksuit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tracksuit createUpdatedEntity(EntityManager em) {
        Tracksuit tracksuit = new Tracksuit()
            .tracksuitId(UPDATED_TRACKSUIT_ID)
            .name(UPDATED_NAME)
            .sizeMin(UPDATED_SIZE_MIN)
            .sizeMax(UPDATED_SIZE_MAX)
            .weightMin(UPDATED_WEIGHT_MIN)
            .weightMax(UPDATED_WEIGHT_MAX)
            .comment(UPDATED_COMMENT);
        return tracksuit;
    }

    @BeforeEach
    public void initTest() {
        tracksuit = createEntity(em);
    }

    @Test
    @Transactional
    public void createTracksuit() throws Exception {
        int databaseSizeBeforeCreate = tracksuitRepository.findAll().size();
        // Create the Tracksuit
        restTracksuitMockMvc.perform(post("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isCreated());

        // Validate the Tracksuit in the database
        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeCreate + 1);
        Tracksuit testTracksuit = tracksuitList.get(tracksuitList.size() - 1);
        assertThat(testTracksuit.getTracksuitId()).isEqualTo(DEFAULT_TRACKSUIT_ID);
        assertThat(testTracksuit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTracksuit.getSizeMin()).isEqualTo(DEFAULT_SIZE_MIN);
        assertThat(testTracksuit.getSizeMax()).isEqualTo(DEFAULT_SIZE_MAX);
        assertThat(testTracksuit.getWeightMin()).isEqualTo(DEFAULT_WEIGHT_MIN);
        assertThat(testTracksuit.getWeightMax()).isEqualTo(DEFAULT_WEIGHT_MAX);
        assertThat(testTracksuit.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createTracksuitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tracksuitRepository.findAll().size();

        // Create the Tracksuit with an existing ID
        tracksuit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTracksuitMockMvc.perform(post("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isBadRequest());

        // Validate the Tracksuit in the database
        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTracksuitIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracksuitRepository.findAll().size();
        // set the field null
        tracksuit.setTracksuitId(null);

        // Create the Tracksuit, which fails.


        restTracksuitMockMvc.perform(post("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isBadRequest());

        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracksuitRepository.findAll().size();
        // set the field null
        tracksuit.setName(null);

        // Create the Tracksuit, which fails.


        restTracksuitMockMvc.perform(post("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isBadRequest());

        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSizeMinIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracksuitRepository.findAll().size();
        // set the field null
        tracksuit.setSizeMin(null);

        // Create the Tracksuit, which fails.


        restTracksuitMockMvc.perform(post("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isBadRequest());

        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSizeMaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracksuitRepository.findAll().size();
        // set the field null
        tracksuit.setSizeMax(null);

        // Create the Tracksuit, which fails.


        restTracksuitMockMvc.perform(post("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isBadRequest());

        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWeightMinIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracksuitRepository.findAll().size();
        // set the field null
        tracksuit.setWeightMin(null);

        // Create the Tracksuit, which fails.


        restTracksuitMockMvc.perform(post("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isBadRequest());

        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWeightMaxIsRequired() throws Exception {
        int databaseSizeBeforeTest = tracksuitRepository.findAll().size();
        // set the field null
        tracksuit.setWeightMax(null);

        // Create the Tracksuit, which fails.


        restTracksuitMockMvc.perform(post("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isBadRequest());

        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTracksuits() throws Exception {
        // Initialize the database
        tracksuitRepository.saveAndFlush(tracksuit);

        // Get all the tracksuitList
        restTracksuitMockMvc.perform(get("/api/tracksuits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tracksuit.getId().intValue())))
            .andExpect(jsonPath("$.[*].tracksuitId").value(hasItem(DEFAULT_TRACKSUIT_ID)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].sizeMin").value(hasItem(DEFAULT_SIZE_MIN)))
            .andExpect(jsonPath("$.[*].sizeMax").value(hasItem(DEFAULT_SIZE_MAX)))
            .andExpect(jsonPath("$.[*].weightMin").value(hasItem(DEFAULT_WEIGHT_MIN)))
            .andExpect(jsonPath("$.[*].weightMax").value(hasItem(DEFAULT_WEIGHT_MAX)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }
    
    @Test
    @Transactional
    public void getTracksuit() throws Exception {
        // Initialize the database
        tracksuitRepository.saveAndFlush(tracksuit);

        // Get the tracksuit
        restTracksuitMockMvc.perform(get("/api/tracksuits/{id}", tracksuit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tracksuit.getId().intValue()))
            .andExpect(jsonPath("$.tracksuitId").value(DEFAULT_TRACKSUIT_ID))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.sizeMin").value(DEFAULT_SIZE_MIN))
            .andExpect(jsonPath("$.sizeMax").value(DEFAULT_SIZE_MAX))
            .andExpect(jsonPath("$.weightMin").value(DEFAULT_WEIGHT_MIN))
            .andExpect(jsonPath("$.weightMax").value(DEFAULT_WEIGHT_MAX))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTracksuit() throws Exception {
        // Get the tracksuit
        restTracksuitMockMvc.perform(get("/api/tracksuits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTracksuit() throws Exception {
        // Initialize the database
        tracksuitRepository.saveAndFlush(tracksuit);

        int databaseSizeBeforeUpdate = tracksuitRepository.findAll().size();

        // Update the tracksuit
        Tracksuit updatedTracksuit = tracksuitRepository.findById(tracksuit.getId()).get();
        // Disconnect from session so that the updates on updatedTracksuit are not directly saved in db
        em.detach(updatedTracksuit);
        updatedTracksuit
            .tracksuitId(UPDATED_TRACKSUIT_ID)
            .name(UPDATED_NAME)
            .sizeMin(UPDATED_SIZE_MIN)
            .sizeMax(UPDATED_SIZE_MAX)
            .weightMin(UPDATED_WEIGHT_MIN)
            .weightMax(UPDATED_WEIGHT_MAX)
            .comment(UPDATED_COMMENT);

        restTracksuitMockMvc.perform(put("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTracksuit)))
            .andExpect(status().isOk());

        // Validate the Tracksuit in the database
        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeUpdate);
        Tracksuit testTracksuit = tracksuitList.get(tracksuitList.size() - 1);
        assertThat(testTracksuit.getTracksuitId()).isEqualTo(UPDATED_TRACKSUIT_ID);
        assertThat(testTracksuit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTracksuit.getSizeMin()).isEqualTo(UPDATED_SIZE_MIN);
        assertThat(testTracksuit.getSizeMax()).isEqualTo(UPDATED_SIZE_MAX);
        assertThat(testTracksuit.getWeightMin()).isEqualTo(UPDATED_WEIGHT_MIN);
        assertThat(testTracksuit.getWeightMax()).isEqualTo(UPDATED_WEIGHT_MAX);
        assertThat(testTracksuit.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingTracksuit() throws Exception {
        int databaseSizeBeforeUpdate = tracksuitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTracksuitMockMvc.perform(put("/api/tracksuits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracksuit)))
            .andExpect(status().isBadRequest());

        // Validate the Tracksuit in the database
        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTracksuit() throws Exception {
        // Initialize the database
        tracksuitRepository.saveAndFlush(tracksuit);

        int databaseSizeBeforeDelete = tracksuitRepository.findAll().size();

        // Delete the tracksuit
        restTracksuitMockMvc.perform(delete("/api/tracksuits/{id}", tracksuit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tracksuit> tracksuitList = tracksuitRepository.findAll();
        assertThat(tracksuitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
