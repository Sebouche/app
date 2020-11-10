package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class SemesterInscriptionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SemesterInscription.class);
        SemesterInscription semesterInscription1 = new SemesterInscription();
        semesterInscription1.setId(1L);
        SemesterInscription semesterInscription2 = new SemesterInscription();
        semesterInscription2.setId(semesterInscription1.getId());
        assertThat(semesterInscription1).isEqualTo(semesterInscription2);
        semesterInscription2.setId(2L);
        assertThat(semesterInscription1).isNotEqualTo(semesterInscription2);
        semesterInscription1.setId(null);
        assertThat(semesterInscription1).isNotEqualTo(semesterInscription2);
    }
}
