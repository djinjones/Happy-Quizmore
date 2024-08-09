import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import Auth from '../utils/auth'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-image: ${(props) => props.theme.navbarBackgroundImage};
  background-position: center; /* Center the image within the navbar */
  background-size: cover; /* Ensure the image covers the entire navbar */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  height: 200px; /* Adjust the height as needed for your design */
  color: ${(props) => props.theme.text};
  transition: all 0.5s ease-in-out;

  /* Apply accumulated rotation based on the rotationAngle prop */
  transform: rotate(${(props) => props.rotationAngle}deg);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.buttonHover};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.buttonBackground};
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-size: 1.5em;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.buttonHover};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.buttonBackground};
  }
`;

const Navbar = ({ setShowSignup, setShowLogin, isSignedIn, setIsSignedIn, rotationAngle, toggleTheme, theme }) => {
  return (
    <Nav rotationAngle={rotationAngle}>
      <div>Happy Quizzmore</div>
      <NavLinks>
        {isSignedIn && <NavLink onClick={() => setIsSignedIn(false)}>Logout</NavLink>}
        <ThemeToggleButton onClick={toggleTheme}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </ThemeToggleButton>
        {Auth.loggedIn() 
          ? <NavLink onClick={Auth.logout()}>Logout</NavLink> 
          : <NavLink onClick={() => setShowSignup(true)}>Signup</NavLink>}
          {Auth.loggedIn() ? <></> : <NavLink onClick={() => setShowLogin(true)}>Login</NavLink>}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;


/**/