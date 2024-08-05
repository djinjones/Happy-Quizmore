
import { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
`;

const LoginModal = ({ setShowLogin, setIsSignedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here (e.g., call to backend API)
    // If successful:
    setIsSignedIn(true);
    setShowLogin(false);
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={() => setShowLogin(false)}>X</CloseButton>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginModal;
