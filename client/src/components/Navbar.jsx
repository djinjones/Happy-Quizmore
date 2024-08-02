
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
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
