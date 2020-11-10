package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class TracksuitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tracksuit.class);
        Tracksuit tracksuit1 = new Tracksuit();
        tracksuit1.setId(1L);
        Tracksuit tracksuit2 = new Tracksuit();
        tracksuit2.setId(tracksuit1.getId());
        assertThat(tracksuit1).isEqualTo(tracksuit2);
        tracksuit2.setId(2L);
        assertThat(tracksuit1).isNotEqualTo(tracksuit2);
        tracksuit1.setId(null);
        assertThat(tracksuit1).isNotEqualTo(tracksuit2);
    }
}
