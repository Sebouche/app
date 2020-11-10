package fr.uga.web.rest;

import fr.uga.EcomApp;
import fr.uga.domain.StudentActivity;
import fr.uga.repository.StudentActivityRepository;

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
 * Integration tests for the {@link StudentActivityResource} REST controller.
 */
@SpringBootTest(classes = EcomApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class StudentActivityResourceIT {

    private static final String DEFAULT_COMMENT_TO_INTRUCTOR = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT_TO_INTRUCTOR = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT_BY_INSTRUCTOR = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT_BY_INSTRUCTOR = "BBBBBBBBBB";

    @Autowired
    private StudentActivityRepository studentActivityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudentActivityMockMvc;

    private StudentActivity studentActivity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentActivity createEntity(EntityManager em) {
        StudentActivity studentActivity = new StudentActivity()
            .commentToIntructor(DEFAULT_COMMENT_TO_INTRUCTOR)
            .commentByInstructor(DEFAULT_COMMENT_BY_INSTRUCTOR);
        return studentActivity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StudentActivity createUpdatedEntity(EntityManager em) {
        StudentActivity studentActivity = new StudentActivity()
            .commentToIntructor(UPDATED_COMMENT_TO_INTRUCTOR)
            .commentByInstructor(UPDATED_COMMENT_BY_INSTRUCTOR);
        return studentActivity;
    }

    @BeforeEach
    public void initTest() {
        studentActivity = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudentActivity() throws Exception {
        int databaseSizeBeforeCreate = studentActivityRepository.findAll().size();
        // Create the StudentActivity
        restStudentActivityMockMvc.perform(post("/api/student-activities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(studentActivity)))
            .andExpect(status().isCreated());

        // Validate the StudentActivity in the database
        List<StudentActivity> studentActivityList = studentActivityRepository.findAll();
        assertThat(studentActivityList).hasSize(databaseSizeBeforeCreate + 1);
        StudentActivity testStudentActivity = studentActivityList.get(studentActivityList.size() - 1);
        assertThat(testStudentActivity.getCommentToIntructor()).isEqualTo(DEFAULT_COMMENT_TO_INTRUCTOR);
        assertThat(testStudentActivity.getCommentByInstructor()).isEqualTo(DEFAULT_COMMENT_BY_INSTRUCTOR);
    }

    @Test
    @Transactional
    public void createStudentActivityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentActivityRepository.findAll().size();

        // Create the StudentActivity with an existing ID
        studentActivity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentActivityMockMvc.perform(post("/api/student-activities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(studentActivity)))
            .andExpect(status().isBadRequest());

        // Validate the StudentActivity in the database
        List<StudentActivity> studentActivityList = studentActivityRepository.findAll();
        assertThat(studentActivityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStudentActivities() throws Exception {
        // Initialize the database
        studentActivityRepository.saveAndFlush(studentActivity);

        // Get all the studentActivityList
        restStudentActivityMockMvc.perform(get("/api/student-activities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentActivity.getId().intValue())))
            .andExpect(jsonPath("$.[*].commentToIntructor").value(hasItem(DEFAULT_COMMENT_TO_INTRUCTOR.toString())))
            .andExpect(jsonPath("$.[*].commentByInstructor").value(hasItem(DEFAULT_COMMENT_BY_INSTRUCTOR.toString())));
    }
    
    @Test
    @Transactional
    public void getStudentActivity() throws Exception {
        // Initialize the database
        studentActivityRepository.saveAndFlush(studentActivity);

        // Get the studentActivity
        restStudentActivityMockMvc.perform(get("/api/student-activities/{id}", studentActivity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(studentActivity.getId().intValue()))
            .andExpect(jsonPath("$.commentToIntructor").value(DEFAULT_COMMENT_TO_INTRUCTOR.toString()))
            .andExpect(jsonPath("$.commentByInstructor").value(DEFAULT_COMMENT_BY_INSTRUCTOR.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingStudentActivity() throws Exception {
        // Get the studentActivity
        restStudentActivityMockMvc.perform(get("/api/student-activities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudentActivity() throws Exception {
        // Initialize the database
        studentActivityRepository.saveAndFlush(studentActivity);

        int databaseSizeBeforeUpdate = studentActivityRepository.findAll().size();

        // Update the studentActivity
        StudentActivity updatedStudentActivity = studentActivityRepository.findById(studentActivity.getId()).get();
        // Disconnect from session so that the updates on updatedStudentActivity are not directly saved in db
        em.detach(updatedStudentActivity);
        updatedStudentActivity
            .commentToIntructor(UPDATED_COMMENT_TO_INTRUCTOR)
            .commentByInstructor(UPDATED_COMMENT_BY_INSTRUCTOR);

        restStudentActivityMockMvc.perform(put("/api/student-activities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudentActivity)))
            .andExpect(status().isOk());

        // Validate the StudentActivity in the database
        List<StudentActivity> studentActivityList = studentActivityRepository.findAll();
        assertThat(studentActivityList).hasSize(databaseSizeBeforeUpdate);
        StudentActivity testStudentActivity = studentActivityList.get(studentActivityList.size() - 1);
        assertThat(testStudentActivity.getCommentToIntructor()).isEqualTo(UPDATED_COMMENT_TO_INTRUCTOR);
        assertThat(testStudentActivity.getCommentByInstructor()).isEqualTo(UPDATED_COMMENT_BY_INSTRUCTOR);
    }

    @Test
    @Transactional
    public void updateNonExistingStudentActivity() throws Exception {
        int databaseSizeBeforeUpdate = studentActivityRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentActivityMockMvc.perform(put("/api/student-activities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(studentActivity)))
            .andExpect(status().isBadRequest());

        // Validate the StudentActivity in the database
        List<StudentActivity> studentActivityList = studentActivityRepository.findAll();
        assertThat(studentActivityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudentActivity() throws Exception {
        // Initialize the database
        studentActivityRepository.saveAndFlush(studentActivity);

        int databaseSizeBeforeDelete = studentActivityRepository.findAll().size();

        // Delete the studentActivity
        restStudentActivityMockMvc.perform(delete("/api/student-activities/{id}", studentActivity.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StudentActivity> studentActivityList = studentActivityRepository.findAll();
        assertThat(studentActivityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
