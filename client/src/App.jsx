
import  { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import GlobalStyle from './styles/GlobalStyle';
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
import { lightTheme, darkTheme } from './styles/theme'; // 

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


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the footer sticks to the bottom */
`;

const ContentWrapper = styled.div`
  flex: 1; /* Take up the remaining space between navbar and footer */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AppTitle = styled.h1`
  color: ${(props) => props.theme.text}; 
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const StartQuizButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  padding: 15px 30px;
  border: none;
  border-radius: 50px; /* Rounded button for a modern look */
  cursor: pointer;
  font-size: 1.25rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
    transform: scale(1.05); /* Slight zoom on hover for interactivity */
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
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to localStorage
   // Increment rotation by 360 degrees
  };

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
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <AppContainer>
          <Navbar
            setShowSignup={setShowSignup}
            setShowLogin={setShowLogin}
            setIsSignedIn={setIsSignedIn}
            isSignedIn={isSignedIn}
            toggleTheme={toggleTheme} 
            theme={theme} 
          />
          <ContentWrapper>
          <div>logged in: { Auth.loggedIn() }</div>
        {Auth.loggedIn() ? <AppTitle>Welcome, Happy Quizmore time!</AppTitle> : <AppTitle>Happy Quizzmore</AppTitle>}
        {startQuiz ? <></> : <StartQuizButton onClick={handleStartQuiz}>Start Quiz</StartQuizButton>}
        {startQuiz && <Quiz />}
          {showSignup && <SignupModal setShowSignup={setShowSignup} />}
          {showLogin && <LoginModal setShowLogin={setShowLogin} setIsSignedIn={setIsSignedIn} />}
          </ContentWrapper>
          <Footer /> 
        </AppContainer>
      </ThemeProvider>
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