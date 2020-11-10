package fr.uga.web.rest;

import fr.uga.EcomApp;
import fr.uga.domain.Cursus;
import fr.uga.repository.CursusRepository;

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

import fr.uga.domain.enumeration.Composant;
/**
 * Integration tests for the {@link CursusResource} REST controller.
 */
@SpringBootTest(classes = EcomApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CursusResourceIT {

    private static final Composant DEFAULT_COMPOSANT = Composant.INFO;
    private static final Composant UPDATED_COMPOSANT = Composant.MAT;

    private static final Integer DEFAULT_ACADEMIC_LEVEL = 0;
    private static final Integer UPDATED_ACADEMIC_LEVEL = 1;

    @Autowired
    private CursusRepository cursusRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCursusMockMvc;

    private Cursus cursus;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cursus createEntity(EntityManager em) {
        Cursus cursus = new Cursus()
            .composant(DEFAULT_COMPOSANT)
            .academicLevel(DEFAULT_ACADEMIC_LEVEL);
        return cursus;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cursus createUpdatedEntity(EntityManager em) {
        Cursus cursus = new Cursus()
            .composant(UPDATED_COMPOSANT)
            .academicLevel(UPDATED_ACADEMIC_LEVEL);
        return cursus;
    }

    @BeforeEach
    public void initTest() {
        cursus = createEntity(em);
    }

    @Test
    @Transactional
    public void createCursus() throws Exception {
        int databaseSizeBeforeCreate = cursusRepository.findAll().size();
        // Create the Cursus
        restCursusMockMvc.perform(post("/api/cursuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cursus)))
            .andExpect(status().isCreated());

        // Validate the Cursus in the database
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeCreate + 1);
        Cursus testCursus = cursusList.get(cursusList.size() - 1);
        assertThat(testCursus.getComposant()).isEqualTo(DEFAULT_COMPOSANT);
        assertThat(testCursus.getAcademicLevel()).isEqualTo(DEFAULT_ACADEMIC_LEVEL);
    }

    @Test
    @Transactional
    public void createCursusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cursusRepository.findAll().size();

        // Create the Cursus with an existing ID
        cursus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCursusMockMvc.perform(post("/api/cursuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cursus)))
            .andExpect(status().isBadRequest());

        // Validate the Cursus in the database
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkComposantIsRequired() throws Exception {
        int databaseSizeBeforeTest = cursusRepository.findAll().size();
        // set the field null
        cursus.setComposant(null);

        // Create the Cursus, which fails.


        restCursusMockMvc.perform(post("/api/cursuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cursus)))
            .andExpect(status().isBadRequest());

        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAcademicLevelIsRequired() throws Exception {
        int databaseSizeBeforeTest = cursusRepository.findAll().size();
        // set the field null
        cursus.setAcademicLevel(null);

        // Create the Cursus, which fails.


        restCursusMockMvc.perform(post("/api/cursuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cursus)))
            .andExpect(status().isBadRequest());

        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCursuses() throws Exception {
        // Initialize the database
        cursusRepository.saveAndFlush(cursus);

        // Get all the cursusList
        restCursusMockMvc.perform(get("/api/cursuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cursus.getId().intValue())))
            .andExpect(jsonPath("$.[*].composant").value(hasItem(DEFAULT_COMPOSANT.toString())))
            .andExpect(jsonPath("$.[*].academicLevel").value(hasItem(DEFAULT_ACADEMIC_LEVEL)));
    }
    
    @Test
    @Transactional
    public void getCursus() throws Exception {
        // Initialize the database
        cursusRepository.saveAndFlush(cursus);

        // Get the cursus
        restCursusMockMvc.perform(get("/api/cursuses/{id}", cursus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cursus.getId().intValue()))
            .andExpect(jsonPath("$.composant").value(DEFAULT_COMPOSANT.toString()))
            .andExpect(jsonPath("$.academicLevel").value(DEFAULT_ACADEMIC_LEVEL));
    }
    @Test
    @Transactional
    public void getNonExistingCursus() throws Exception {
        // Get the cursus
        restCursusMockMvc.perform(get("/api/cursuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCursus() throws Exception {
        // Initialize the database
        cursusRepository.saveAndFlush(cursus);

        int databaseSizeBeforeUpdate = cursusRepository.findAll().size();

        // Update the cursus
        Cursus updatedCursus = cursusRepository.findById(cursus.getId()).get();
        // Disconnect from session so that the updates on updatedCursus are not directly saved in db
        em.detach(updatedCursus);
        updatedCursus
            .composant(UPDATED_COMPOSANT)
            .academicLevel(UPDATED_ACADEMIC_LEVEL);

        restCursusMockMvc.perform(put("/api/cursuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCursus)))
            .andExpect(status().isOk());

        // Validate the Cursus in the database
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeUpdate);
        Cursus testCursus = cursusList.get(cursusList.size() - 1);
        assertThat(testCursus.getComposant()).isEqualTo(UPDATED_COMPOSANT);
        assertThat(testCursus.getAcademicLevel()).isEqualTo(UPDATED_ACADEMIC_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingCursus() throws Exception {
        int databaseSizeBeforeUpdate = cursusRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCursusMockMvc.perform(put("/api/cursuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cursus)))
            .andExpect(status().isBadRequest());

        // Validate the Cursus in the database
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCursus() throws Exception {
        // Initialize the database
        cursusRepository.saveAndFlush(cursus);

        int databaseSizeBeforeDelete = cursusRepository.findAll().size();

        // Delete the cursus
        restCursusMockMvc.perform(delete("/api/cursuses/{id}", cursus.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
