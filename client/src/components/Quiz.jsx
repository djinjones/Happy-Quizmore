import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useApolloClient } from '@apollo/client';
import { GET_QUESTIONS } from '../utils/queries';
import rightGif from '../assets/gifs/right.gif';
import wrongGif from '../assets/gifs/wrong.gif';
import FireworksDisplay from './Fireworks';

const slideIn = keyframes`
  0% {
    transform: translateX(150%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const popUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 840px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  background-color: ${(props) => props.theme.cardBackground};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure relative positioning to position scoreboard inside */
`;

const ScoreboardContainer = styled.div`
  position: absolute;
  top: 10px; /* Positioning from the top */
  right: 10px; /* Positioning from the right */
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.theme.scoreboardBackground};
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideIn} 0.5s ease forwards;
  z-index: 1000; /* Ensure it appears above other content */
`;

const ScoreText = styled.div`
  font-size: 1.2em;
  color: ${(props) => props.theme.text};
  font-weight: bold;
  text-align: center;
`;

const FeedbackImage = styled.img`
  width: 80px;
  height: 80px;
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${(props) => (props.show ? popUp : fadeOut)} 1s ease forwards;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 15px;
  z-index: 10;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    transform: scale(1.1);
  }
`;

const LeftButton = styled(ScrollButton)`
  left: 0px;
`;

const RightButton = styled(ScrollButton)`
  right: 0px;
`;

const QuestionContainer = styled.div`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: ${({ iscorrect, theme }) =>
    iscorrect === null
      ? theme.cardBackground
      : iscorrect
      ? 'rgba(0, 255, 0, 0.3)'
      : 'rgba(255, 0, 0, 0.3)'};
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
`;

const QuestionTitle = styled.h2`
  font-size: 1.5em;
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  margin-top: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${(props) => props.theme.buttonBackground};
    outline: none;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
  object-fit: cover;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
    transform: scale(1.05);
  }
`;

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answerStatus, setAnswerStatus] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [feedbackImage, setFeedbackImage] = useState(null); // Store feedback image URL
  const [showFeedback, setShowFeedback] = useState(false); // Control feedback image visibility

  const client = useApolloClient();
  const quizContainerRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await client.query({
          query: GET_QUESTIONS,
        });
        setQuestions(data.questions);

        setAnswerStatus(
          data.questions.reduce((acc, question) => {
            acc[question._id] = null; // Initialize each question's status as null
            return acc;
          }, {})
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [client]);

  const handleChange = (questionId, value) => {
    // Process the input by trimming spaces and converting to lowercase
    const processedAnswer = value.trim().toLowerCase();
    setAnswers({
      ...answers,
      [questionId]: processedAnswer,
    });
  };

  const handleScrollLeft = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleScrollRight = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleSubmit = (questionId, i) => {
    const userAnswer = answers[questionId];
    const question = questions.find(q => q._id === questionId);
    const index = i + 1;
    const iscorrect = question && userAnswer && userAnswer.toLowerCase() === question.title.toLowerCase();

    if (iscorrect) {
      setResult(prevResult => prevResult + 1); // Increment score if correct
      setFeedbackImage(`${rightGif}`); // Set happy GIF
    } else {
      setFeedbackImage(`${wrongGif}`); // Set sad GIF
    }

    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1500); // Hide feedback image after 1.5 second

    setAnswerStatus(prevStatus => ({
      ...prevStatus,
      [question._id]: iscorrect !== undefined ? iscorrect : null // Update to true/false, keep null if not answered
    }));

    if (currentQuestionIndex < questions.length - 1) {
      handleScrollRight();
    } else {
      setSubmitted(true);
    }
  };


  if (error) return <p>Error loading questions</p>;
  if (loading) return <p>Loading...</p>;
  if (submitted) return <div>Your final score is: {result} / {questions.length}</div>;

  return (
    <>
      <QuizContainer ref={quizContainerRef}>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionContainer key={index} isVisible={index === currentQuestionIndex} iscorrect={answerStatus[question._id]}>
              <Image src={question.url} alt="movie scene" />
              <QuestionTitle>Which movie is this?</QuestionTitle>
              <Input
                className='movie-answer-input'
                data-question-input={question._id}
                type='text'
                placeholder='movie title here'
                onChange={(e) => setAnswers({ ...answers, [question._id]: e.target.value })}
              />
              <SubmitButton
                className='movie-answer-submit'
                data-question-submit={question._id}
                onClick={() => handleSubmit(question._id, index)}>
                Submit
              </SubmitButton>
            </QuestionContainer>
          ))
        ) : (
          <p>No questions available</p>
        )}
  
        <LeftButton onClick={handleScrollLeft} disabled={currentQuestionIndex === 0}>{'<'}</LeftButton>
        <RightButton onClick={handleScrollRight} disabled={currentQuestionIndex === questions.length - 1}>{'>'}</RightButton>
  
        <ScoreboardContainer>
          <ScoreText>{result} / {questions.length}</ScoreText>
          <FeedbackImage src={feedbackImage} show={showFeedback} alt="feedback" />
        </ScoreboardContainer>
      </QuizContainer>
      {submitted && <FireworksDisplay/>}  {/* Display fireworks on quiz completion */}
    </>
  );
};

export default Quiz;
