/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import Auth from '../utils/auth';

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 20px;
  background-image: ${(props) => props.theme.navbarBackgroundImage};
  background-position: center;
  background-size: cover; /* Ensure the image covers the entire navbar */
  background-repeat: no-repeat;
  height: 200px; 
  color: ${(props) => props.theme.text};
  transition: all 0.5s ease-in-out;
  position: relative;

  /* Make adjustments for large screens */
  @media (min-width: 1200px) {
    background-size: cover; /* Ensure the entire image is visible */
    height: 300px; /* Increase height on larger screens to avoid distortion */
  }

  /* Make adjustments for smaller screens */
  @media (max-width: 768px) {
    background-size: ;
    height: 150px; /* Reduce height on smaller screens */
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0px;
  position: absolute;
  bottom: 10px;
  left: 20px;
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

const Navbar = ({ setShowSignup, setShowLogin, isSignedIn, setIsSignedIn, toggleTheme, theme }) => {
  return (
    <Nav>
      <NavLinks>
        {isSignedIn && <NavLink onClick={() => setIsSignedIn(false)}>Logout</NavLink>}
        {Auth.loggedIn() 
          ? <NavLink onClick={() => Auth.logout()}>Logout</NavLink> 
          : <NavLink onClick={() => setShowSignup(true)}>Signup</NavLink>}
          {Auth.loggedIn() ? null : <NavLink onClick={() => setShowLogin(true)}>Login</NavLink>}
          <ThemeToggleButton onClick={toggleTheme}>
        {theme === 'light' ? <FaSun /> : <FaMoon />}
      </ThemeToggleButton>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
