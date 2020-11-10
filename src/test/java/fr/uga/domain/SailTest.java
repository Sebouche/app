package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class SailTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sail.class);
        Sail sail1 = new Sail();
        sail1.setId(1L);
        Sail sail2 = new Sail();
        sail2.setId(sail1.getId());
        assertThat(sail1).isEqualTo(sail2);
        sail2.setId(2L);
        assertThat(sail1).isNotEqualTo(sail2);
        sail1.setId(null);
        assertThat(sail1).isNotEqualTo(sail2);
    }
}
