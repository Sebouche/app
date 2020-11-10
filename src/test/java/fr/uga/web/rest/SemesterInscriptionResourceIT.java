package fr.uga.web.rest;

import fr.uga.EcomApp;
import fr.uga.domain.SemesterInscription;
import fr.uga.repository.SemesterInscriptionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SemesterInscriptionResource} REST controller.
 */
@SpringBootTest(classes = EcomApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SemesterInscriptionResourceIT {

    private static final Boolean DEFAULT_NOTED = false;
    private static final Boolean UPDATED_NOTED = true;

    private static final Integer DEFAULT_NOTE_MAX = 1;
    private static final Integer UPDATED_NOTE_MAX = 2;

    private static final Integer DEFAULT_NOTE_GIVEN = 1;
    private static final Integer UPDATED_NOTE_GIVEN = 2;

    private static final Boolean DEFAULT_PAID = false;
    private static final Boolean UPDATED_PAID = true;

    @Autowired
    private SemesterInscriptionRepository semesterInscriptionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSemesterInscriptionMockMvc;

    private SemesterInscription semesterInscription;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SemesterInscription createEntity(EntityManager em) {
        SemesterInscription semesterInscription = new SemesterInscription()
            .noted(DEFAULT_NOTED)
            .noteMax(DEFAULT_NOTE_MAX)
            .noteGiven(DEFAULT_NOTE_GIVEN)
            .paid(DEFAULT_PAID);
        return semesterInscription;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SemesterInscription createUpdatedEntity(EntityManager em) {
        SemesterInscription semesterInscription = new SemesterInscription()
            .noted(UPDATED_NOTED)
            .noteMax(UPDATED_NOTE_MAX)
            .noteGiven(UPDATED_NOTE_GIVEN)
            .paid(UPDATED_PAID);
        return semesterInscription;
    }

    @BeforeEach
    public void initTest() {
        semesterInscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createSemesterInscription() throws Exception {
        int databaseSizeBeforeCreate = semesterInscriptionRepository.findAll().size();
        // Create the SemesterInscription
        restSemesterInscriptionMockMvc.perform(post("/api/semester-inscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semesterInscription)))
            .andExpect(status().isCreated());

        // Validate the SemesterInscription in the database
        List<SemesterInscription> semesterInscriptionList = semesterInscriptionRepository.findAll();
        assertThat(semesterInscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        SemesterInscription testSemesterInscription = semesterInscriptionList.get(semesterInscriptionList.size() - 1);
        assertThat(testSemesterInscription.isNoted()).isEqualTo(DEFAULT_NOTED);
        assertThat(testSemesterInscription.getNoteMax()).isEqualTo(DEFAULT_NOTE_MAX);
        assertThat(testSemesterInscription.getNoteGiven()).isEqualTo(DEFAULT_NOTE_GIVEN);
        assertThat(testSemesterInscription.isPaid()).isEqualTo(DEFAULT_PAID);
    }

    @Test
    @Transactional
    public void createSemesterInscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = semesterInscriptionRepository.findAll().size();

        // Create the SemesterInscription with an existing ID
        semesterInscription.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSemesterInscriptionMockMvc.perform(post("/api/semester-inscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semesterInscription)))
            .andExpect(status().isBadRequest());

        // Validate the SemesterInscription in the database
        List<SemesterInscription> semesterInscriptionList = semesterInscriptionRepository.findAll();
        assertThat(semesterInscriptionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNotedIsRequired() throws Exception {
        int databaseSizeBeforeTest = semesterInscriptionRepository.findAll().size();
        // set the field null
        semesterInscription.setNoted(null);

        // Create the SemesterInscription, which fails.


        restSemesterInscriptionMockMvc.perform(post("/api/semester-inscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semesterInscription)))
            .andExpect(status().isBadRequest());

        List<SemesterInscription> semesterInscriptionList = semesterInscriptionRepository.findAll();
        assertThat(semesterInscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaidIsRequired() throws Exception {
        int databaseSizeBeforeTest = semesterInscriptionRepository.findAll().size();
        // set the field null
        semesterInscription.setPaid(null);

        // Create the SemesterInscription, which fails.


        restSemesterInscriptionMockMvc.perform(post("/api/semester-inscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semesterInscription)))
            .andExpect(status().isBadRequest());

        List<SemesterInscription> semesterInscriptionList = semesterInscriptionRepository.findAll();
        assertThat(semesterInscriptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSemesterInscriptions() throws Exception {
        // Initialize the database
        semesterInscriptionRepository.saveAndFlush(semesterInscription);

        // Get all the semesterInscriptionList
        restSemesterInscriptionMockMvc.perform(get("/api/semester-inscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(semesterInscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].noted").value(hasItem(DEFAULT_NOTED.booleanValue())))
            .andExpect(jsonPath("$.[*].noteMax").value(hasItem(DEFAULT_NOTE_MAX)))
            .andExpect(jsonPath("$.[*].noteGiven").value(hasItem(DEFAULT_NOTE_GIVEN)))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSemesterInscription() throws Exception {
        // Initialize the database
        semesterInscriptionRepository.saveAndFlush(semesterInscription);

        // Get the semesterInscription
        restSemesterInscriptionMockMvc.perform(get("/api/semester-inscriptions/{id}", semesterInscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(semesterInscription.getId().intValue()))
            .andExpect(jsonPath("$.noted").value(DEFAULT_NOTED.booleanValue()))
            .andExpect(jsonPath("$.noteMax").value(DEFAULT_NOTE_MAX))
            .andExpect(jsonPath("$.noteGiven").value(DEFAULT_NOTE_GIVEN))
            .andExpect(jsonPath("$.paid").value(DEFAULT_PAID.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSemesterInscription() throws Exception {
        // Get the semesterInscription
        restSemesterInscriptionMockMvc.perform(get("/api/semester-inscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSemesterInscription() throws Exception {
        // Initialize the database
        semesterInscriptionRepository.saveAndFlush(semesterInscription);

        int databaseSizeBeforeUpdate = semesterInscriptionRepository.findAll().size();

        // Update the semesterInscription
        SemesterInscription updatedSemesterInscription = semesterInscriptionRepository.findById(semesterInscription.getId()).get();
        // Disconnect from session so that the updates on updatedSemesterInscription are not directly saved in db
        em.detach(updatedSemesterInscription);
        updatedSemesterInscription
            .noted(UPDATED_NOTED)
            .noteMax(UPDATED_NOTE_MAX)
            .noteGiven(UPDATED_NOTE_GIVEN)
            .paid(UPDATED_PAID);

        restSemesterInscriptionMockMvc.perform(put("/api/semester-inscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSemesterInscription)))
            .andExpect(status().isOk());

        // Validate the SemesterInscription in the database
        List<SemesterInscription> semesterInscriptionList = semesterInscriptionRepository.findAll();
        assertThat(semesterInscriptionList).hasSize(databaseSizeBeforeUpdate);
        SemesterInscription testSemesterInscription = semesterInscriptionList.get(semesterInscriptionList.size() - 1);
        assertThat(testSemesterInscription.isNoted()).isEqualTo(UPDATED_NOTED);
        assertThat(testSemesterInscription.getNoteMax()).isEqualTo(UPDATED_NOTE_MAX);
        assertThat(testSemesterInscription.getNoteGiven()).isEqualTo(UPDATED_NOTE_GIVEN);
        assertThat(testSemesterInscription.isPaid()).isEqualTo(UPDATED_PAID);
    }

    @Test
    @Transactional
    public void updateNonExistingSemesterInscription() throws Exception {
        int databaseSizeBeforeUpdate = semesterInscriptionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSemesterInscriptionMockMvc.perform(put("/api/semester-inscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semesterInscription)))
            .andExpect(status().isBadRequest());

        // Validate the SemesterInscription in the database
        List<SemesterInscription> semesterInscriptionList = semesterInscriptionRepository.findAll();
        assertThat(semesterInscriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSemesterInscription() throws Exception {
        // Initialize the database
        semesterInscriptionRepository.saveAndFlush(semesterInscription);

        int databaseSizeBeforeDelete = semesterInscriptionRepository.findAll().size();

        // Delete the semesterInscription
        restSemesterInscriptionMockMvc.perform(delete("/api/semester-inscriptions/{id}", semesterInscription.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SemesterInscription> semesterInscriptionList = semesterInscriptionRepository.findAll();
        assertThat(semesterInscriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
