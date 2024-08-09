import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.modalBackground}; /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: ${(props) => props.theme.cardBackground}; /* Card background based on theme */
  color: ${(props) => props.theme.text}; /* Text color based on theme */
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
   background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${(props) => props.theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const LoginModal = ({ setShowLogin, setIsSignedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 
 
 
  const handleLogin = async (e) => {
    const [ login, { err } ] = useMutation(LOGIN)

    e.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {username: username, password: password}
      });
      const token = mutationResponse.data.login.token;
      console.log('attempting login...')
      Auth.login(token)
      setIsSignedIn(true);

    } catch (error) {
      console.error("error: ", error)
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={() => setShowLogin(false)}>X</CloseButton>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginModal;
