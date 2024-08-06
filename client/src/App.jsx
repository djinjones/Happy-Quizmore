
import  { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';


<<<<<<< HEAD
=======
/* code for using outlet and apollo client will only work when apollo client is set up in the server. 
As of monday 8/5 these changes have been untested but i believe they should work -Dan
import { StoreProvider } from './utils/globalState';
import { Outlet } from 'react-router-dom';
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

*/

>>>>>>> 5925966cdc004c1c7eaf429985db66304f251219
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
    if (isSignedIn) {
      setStartQuiz(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
<<<<<<< HEAD
    <ThemeProvider theme={theme}>
    <AppContainer>
      <GlobalStyle />
      <Navbar
        setShowSignup={setShowSignup}
        setShowLogin={setShowLogin}
        setIsSignedIn={setIsSignedIn}
        isSignedIn={isSignedIn}
      />
      <AppTitle>Happy Quizmore</AppTitle>
      <StartQuizButton onClick={handleStartQuiz}>Start Quiz</StartQuizButton>
      {startQuiz && <Quiz />}
      {showSignup && <SignupModal setShowSignup={setShowSignup} />}
      {showLogin && <LoginModal setShowLogin={setShowLogin} setIsSignedIn={setIsSignedIn} />}
    </AppContainer>
    </ThemeProvider>
=======

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

>>>>>>> 5925966cdc004c1c7eaf429985db66304f251219
  );
}

export default App;


/* below is the code for using the Apollo provider and the router within react-router-dom
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
*/