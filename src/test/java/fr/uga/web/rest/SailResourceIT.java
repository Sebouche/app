package fr.uga.web.rest;

import fr.uga.EcomApp;
import fr.uga.domain.Sail;
import fr.uga.repository.SailRepository;

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

import fr.uga.domain.enumeration.SportLevel;
/**
 * Integration tests for the {@link SailResource} REST controller.
 */
@SpringBootTest(classes = EcomApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SailResourceIT {

    private static final String DEFAULT_SAIL_ID = "AAAAAAAAAA";
    private static final String UPDATED_SAIL_ID = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Float DEFAULT_AREA = 1F;
    private static final Float UPDATED_AREA = 2F;

    private static final SportLevel DEFAULT_LEVEL = SportLevel.BEGINNER;
    private static final SportLevel UPDATED_LEVEL = SportLevel.BEGINNER2;

    private static final Boolean DEFAULT_USABLE = false;
    private static final Boolean UPDATED_USABLE = true;

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private SailRepository sailRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSailMockMvc;

    private Sail sail;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sail createEntity(EntityManager em) {
        Sail sail = new Sail()
            .sailId(DEFAULT_SAIL_ID)
            .name(DEFAULT_NAME)
            .area(DEFAULT_AREA)
            .level(DEFAULT_LEVEL)
            .usable(DEFAULT_USABLE)
            .comment(DEFAULT_COMMENT);
        return sail;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sail createUpdatedEntity(EntityManager em) {
        Sail sail = new Sail()
            .sailId(UPDATED_SAIL_ID)
            .name(UPDATED_NAME)
            .area(UPDATED_AREA)
            .level(UPDATED_LEVEL)
            .usable(UPDATED_USABLE)
            .comment(UPDATED_COMMENT);
        return sail;
    }

    @BeforeEach
    public void initTest() {
        sail = createEntity(em);
    }

    @Test
    @Transactional
    public void createSail() throws Exception {
        int databaseSizeBeforeCreate = sailRepository.findAll().size();
        // Create the Sail
        restSailMockMvc.perform(post("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sail)))
            .andExpect(status().isCreated());

        // Validate the Sail in the database
        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeCreate + 1);
        Sail testSail = sailList.get(sailList.size() - 1);
        assertThat(testSail.getSailId()).isEqualTo(DEFAULT_SAIL_ID);
        assertThat(testSail.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSail.getArea()).isEqualTo(DEFAULT_AREA);
        assertThat(testSail.getLevel()).isEqualTo(DEFAULT_LEVEL);
        assertThat(testSail.isUsable()).isEqualTo(DEFAULT_USABLE);
        assertThat(testSail.getComment()).isEqualTo(DEFAULT_COMMENT);
    }

    @Test
    @Transactional
    public void createSailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sailRepository.findAll().size();

        // Create the Sail with an existing ID
        sail.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSailMockMvc.perform(post("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sail)))
            .andExpect(status().isBadRequest());

        // Validate the Sail in the database
        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSailIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = sailRepository.findAll().size();
        // set the field null
        sail.setSailId(null);

        // Create the Sail, which fails.


        restSailMockMvc.perform(post("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sail)))
            .andExpect(status().isBadRequest());

        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sailRepository.findAll().size();
        // set the field null
        sail.setName(null);

        // Create the Sail, which fails.


        restSailMockMvc.perform(post("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sail)))
            .andExpect(status().isBadRequest());

        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAreaIsRequired() throws Exception {
        int databaseSizeBeforeTest = sailRepository.findAll().size();
        // set the field null
        sail.setArea(null);

        // Create the Sail, which fails.


        restSailMockMvc.perform(post("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sail)))
            .andExpect(status().isBadRequest());

        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = sailRepository.findAll().size();
        // set the field null
        sail.setLevel(null);

        // Create the Sail, which fails.


        restSailMockMvc.perform(post("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sail)))
            .andExpect(status().isBadRequest());

        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUsableIsRequired() throws Exception {
        int databaseSizeBeforeTest = sailRepository.findAll().size();
        // set the field null
        sail.setUsable(null);

        // Create the Sail, which fails.


        restSailMockMvc.perform(post("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sail)))
            .andExpect(status().isBadRequest());

        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSails() throws Exception {
        // Initialize the database
        sailRepository.saveAndFlush(sail);

        // Get all the sailList
        restSailMockMvc.perform(get("/api/sails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sail.getId().intValue())))
            .andExpect(jsonPath("$.[*].sailId").value(hasItem(DEFAULT_SAIL_ID)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.doubleValue())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].usable").value(hasItem(DEFAULT_USABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }
    
    @Test
    @Transactional
    public void getSail() throws Exception {
        // Initialize the database
        sailRepository.saveAndFlush(sail);

        // Get the sail
        restSailMockMvc.perform(get("/api/sails/{id}", sail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sail.getId().intValue()))
            .andExpect(jsonPath("$.sailId").value(DEFAULT_SAIL_ID))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA.doubleValue()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()))
            .andExpect(jsonPath("$.usable").value(DEFAULT_USABLE.booleanValue()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSail() throws Exception {
        // Get the sail
        restSailMockMvc.perform(get("/api/sails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSail() throws Exception {
        // Initialize the database
        sailRepository.saveAndFlush(sail);

        int databaseSizeBeforeUpdate = sailRepository.findAll().size();

        // Update the sail
        Sail updatedSail = sailRepository.findById(sail.getId()).get();
        // Disconnect from session so that the updates on updatedSail are not directly saved in db
        em.detach(updatedSail);
        updatedSail
            .sailId(UPDATED_SAIL_ID)
            .name(UPDATED_NAME)
            .area(UPDATED_AREA)
            .level(UPDATED_LEVEL)
            .usable(UPDATED_USABLE)
            .comment(UPDATED_COMMENT);

        restSailMockMvc.perform(put("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSail)))
            .andExpect(status().isOk());

        // Validate the Sail in the database
        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeUpdate);
        Sail testSail = sailList.get(sailList.size() - 1);
        assertThat(testSail.getSailId()).isEqualTo(UPDATED_SAIL_ID);
        assertThat(testSail.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSail.getArea()).isEqualTo(UPDATED_AREA);
        assertThat(testSail.getLevel()).isEqualTo(UPDATED_LEVEL);
        assertThat(testSail.isUsable()).isEqualTo(UPDATED_USABLE);
        assertThat(testSail.getComment()).isEqualTo(UPDATED_COMMENT);
    }

    @Test
    @Transactional
    public void updateNonExistingSail() throws Exception {
        int databaseSizeBeforeUpdate = sailRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSailMockMvc.perform(put("/api/sails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sail)))
            .andExpect(status().isBadRequest());

        // Validate the Sail in the database
        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSail() throws Exception {
        // Initialize the database
        sailRepository.saveAndFlush(sail);

        int databaseSizeBeforeDelete = sailRepository.findAll().size();

        // Delete the sail
        restSailMockMvc.perform(delete("/api/sails/{id}", sail.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sail> sailList = sailRepository.findAll();
        assertThat(sailList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
