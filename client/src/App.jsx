
import  { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import Auth from './utils/auth'

// uncomment this code if we decide we need to switch to global store for global state
// import { StoreProvider } from './utils/globalState';
// import { Outlet } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});
console.log("26", httpLink)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
console.log(client.link)




const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ababab;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const AppTitle = styled.h1`
  color: #333;
`;

const StartQuizButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #45a049;
  }
`;

/* code for homepage to use with <Link to='/home'/>
const Home = () => (
  <AppContainer>
    <AppTitle>Happy Quizzmore</AppTitle>
    <StartQuizButton onClick={() => {}}>Start Quiz</StartQuizButton>
    <Outlet />
  </AppContainer>
);
*/

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    if (Auth.loggedIn()) {
      alert('starting quiz...')
      setStartQuiz(true);
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    // This will run when the component mounts
    console.log(Auth.loggedIn());

    // Optionally, return a cleanup function
    return () => {
      console.log('return!');
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <AppContainer>
        <GlobalStyle />
        <Navbar
          setShowSignup={setShowSignup}
          setShowLogin={setShowLogin}
          setIsSignedIn={setIsSignedIn}
          isSignedIn={isSignedIn}
        />
        <div>logged in: { Auth.loggedIn() }</div>
        {Auth.loggedIn() ? <AppTitle>Welcome, Happy Quizmore time!</AppTitle> : <AppTitle>Happy Quizzmore</AppTitle>}
        {startQuiz ? <></> : <StartQuizButton onClick={handleStartQuiz}>Start Quiz</StartQuizButton>}
        {startQuiz && <Quiz />}
        
        {showSignup && <SignupModal setShowSignup={setShowSignup} />}
        {showLogin && <LoginModal setShowLogin={setShowLogin} setIsSignedIn={setIsSignedIn} />}
      </AppContainer>
    </ApolloProvider>
);

}

export default App;


/* 
<------------------------html in apollo provider wrapper using store and outlet----------------------->

return (
 <ApolloProvider client={client}>
  <Router>
    <GlobalStyle />
    <Navbar
      setShowSignup={setShowSignup}
      setShowLogin={setShowLogin}
      setIsSignedIn={setIsSignedIn}
      isSignedIn={isSignedIn}
    />
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<div>Welcome! Click start quiz to begin.</div>} />
        <Route path="quiz" element={<Quiz />} />
      </Route>
    </Routes>
    {showSignup && <SignupModal setShowSignup={setShowSignup} />}
    {showLogin && <LoginModal setShowLogin={setShowLogin} setIsSignedIn={setIsSignedIn} />}
  </Router>
</ApolloProvider> 
);
 } 

<------------------------previous code----------------------->

return (

      <AppContainer>
        <GlobalStyle />
        <Navbar
          setShowSignup={setShowSignup}
          setShowLogin={setShowLogin}
          setIsSignedIn={setIsSignedIn}
          isSignedIn={isSignedIn}
        />
        <AppTitle>Happy Quizzmore</AppTitle>
        <StartQuizButton onClick={handleStartQuiz}>Start Quiz</StartQuizButton>
        {startQuiz && <Quiz />}
        {showSignup && <SignupModal setShowSignup={setShowSignup} />}
        {showLogin && <LoginModal setShowLogin={setShowLogin} setIsSignedIn={setIsSignedIn} />}
      </AppContainer>

  );



*/