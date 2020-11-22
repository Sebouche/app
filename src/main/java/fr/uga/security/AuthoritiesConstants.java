package fr.uga.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

	
	//For manager role
    public static final String ADMIN = "ROLE_ADMIN";

    //For student role
    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
    
    //For Instructor role
    public static final String INSTRUCTOR = "ROLE_INSTRUCTOR";

    private AuthoritiesConstants() {
    }
}
