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
  max-width: 400px;
  width: 100%;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #45a049;
  }
`;

const SignupModal = ({ setShowSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setShowSignup(false);
      } else {
        // Handle errors here
        console.error(data.message);
      }
    });
  };
  

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={() => setShowSignup(false)}>X</CloseButton>
        <h2>Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton type="submit">Signup</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default SignupModal;
