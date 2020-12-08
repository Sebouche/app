package fr.uga.web.rest.vm;

import fr.uga.domain.enumeration.Composant;
import fr.uga.domain.enumeration.MeetingPlace;
import fr.uga.domain.enumeration.SportLevel;
import fr.uga.service.dto.UserDTO;
import javax.validation.constraints.Size;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {

    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;
    
    private boolean isStudent;
    
    private SportLevel sportLevel;
    
    private boolean drivingLicence;
    
    private MeetingPlace meetingPlace;
    
    private Composant cursusComposant;
    
    private int cursusLevel;
    
    // no FirstName or LastName because it's arleady defined in extending class userDTO

    public ManagedUserVM() {
    	// Empty constructor needed for Jackson.
    }
    
    public boolean isStudent() {
		return isStudent;
	}

	public void setStudent(boolean isStudent) {
		this.isStudent = isStudent;
	}

    public SportLevel getSportLevel() {
		return sportLevel;
	}

	public void setSportLevel(SportLevel sportLevel) {
		this.sportLevel = sportLevel;
	}

	public boolean isDrivingLicence() {
		return drivingLicence;
	}

	public void setDrivingLicence(boolean drivingLicence) {
		this.drivingLicence = drivingLicence;
	}

	public MeetingPlace getMeetingPlace() {
		return meetingPlace;
	}

	public void setMeetingPlace(MeetingPlace meetingPlace) {
		this.meetingPlace = meetingPlace;
	}

	public Composant getCursusComposant() {
		return cursusComposant;
	}

	public void setCursusComposant(Composant composant) {
		this.cursusComposant = composant;
	}

	public int getCursusLevel() {
		return cursusLevel;
	}

	public void setCursusLevel(int academicLevel) {
		this.cursusLevel = academicLevel;
	}

	public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ManagedUserVM{" + super.toString() + "} ";
    }
}
