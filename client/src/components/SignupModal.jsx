/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { GET_USERS } from '../utils/queries'
import Auth from '../utils/auth';

// Old import SignupForm from './SignupForm';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.modalBackground};
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
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

const SignupModal = ({ setShowSignup}) => {
  const [username, setUsername] = useState('');
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // The following code addUser() needs to be added into the server before it works on the front end
  const [addUser, {err}] = useMutation(ADD_USER);
  const {loading, er, data} = useQuery(GET_USERS);

  const handleSubmit = async (e, ) => {
    e.preventDefault();
    if (!username || !password) {
      setError('All fields are required!');
      return;
    }

    console.log(username, password)
    // use mutation to add new user to database here 
    console.log(addUser)
    try { 
      const allUsers = data
      console.log(data);
      for (let index = 0; index < allUsers.length ; index++) {
        const dbUsername = allUsers[index].username;
        if (username.toLowerCase() === dbUsername.toLowerCase()) {
          setError('A user with that name already exists!');
          return
        }
      }



      const mutationResponse = await addUser({
        variables: {username: username, password: password},
      });

      console.log("mutation response: ", mutationResponse)
      
      if (!mutationResponse.data || !mutationResponse.data.addUser || !mutationResponse.data.addUser.token) {
        console.log('data: ', mutationResponse.data, 'addUser: ', mutationResponse.data.addUser, )
        console.error("something is wrong with token recieved from database server!");
        return;
      }

      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
      setShowSignup(false)
    } catch(error) {
      console.error("error during mutation: ", error)
    }
    

    
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={() => setShowSignup(false)}>X</CloseButton>
        <h2>Signup</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
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
          <SubmitButton type="submit">Signup</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default SignupModal;


/*  

<------removed email code because we dont feel that it makes sense to have to use an email for this website------>

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

<---------------------------------Removed fetch logic to use mutations in graphql--------------------------------->

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
        setError(data.message);
      }
    })
    .catch(() => setError('An error occurred. Please try again.'));


*/