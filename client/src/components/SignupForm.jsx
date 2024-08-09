/*

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

// This is dan's code 
function SignupForm() {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    //const [addUser] = useMutation(ADD_USER);

    const handleSignup = async (event) => {

        event.preventDefault();


    };

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    return(
        <>
            <form className='signup-form'>
            <label htmlFor="username" className='modal-label'> Username: </label>
            <input
                className='modal-input'
                type="username"
                name='username'
                id='username'
                placeholder="Username"
                value={formState.username}
                onChange={handleChange}
            />
            <label htmlFor="email"> Email: </label>
            <input
                type="email"
                name='email'
                id='email'
                placeholder='Email'
                value={formState.email}
                onChange={handleChange}
            />
            <label htmlFor="password"> Password: </label>
            < input 
                type="password"
                name='password'
                id='password'
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}  
            />
            <button type='submit' onClick={handleSignup}>Signup</button>
            </form>
        </>
    );
}

export default SignupForm;

//code that belong in handleSignup: 

        // const mutationResponse = await addUser({
        //     variables: {
        //       email: formState.email,
        //       password: formState.password,
        //       userName: formState.username
        //     },
        //   });
        
        // const token = mutationResponse.data.addUser.token;
        // Auth.login(token);

        // setIsSignedIn(true);
        // setShowSignup(false);

        */