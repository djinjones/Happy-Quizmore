
import  { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
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
}

export default App;
