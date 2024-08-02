
import styled from 'styled-components';
import backgroundImage from '../assets/images/billy-madison.jpg';

const Nav = styled.nav`
   display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  background-image: url(${backgroundImage});
  background-position: center top;
  background-size: contain; /* Adjust this value if needed */
  height: 300px; /* Adjust the height as needed to fit the head */
  background-repeat: no-repeat; /* Prevent the image from repeating */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = ({ setShowSignup, setShowLogin, isSignedIn, setIsSignedIn }) => {
  return (
    <Nav>
      <div>Happy Quizzmore</div>
      <NavLinks>
        {!isSignedIn && <NavLink onClick={() => setShowSignup(true)}>Signup</NavLink>}
        {!isSignedIn && <NavLink onClick={() => setShowLogin(true)}>Login</NavLink>}
        {isSignedIn && <NavLink onClick={() => setIsSignedIn(false)}>Logout</NavLink>}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
