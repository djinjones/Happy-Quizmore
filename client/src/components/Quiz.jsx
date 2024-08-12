import { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import { GET_QUESTIONS } from '../utils/queries';
import { SUBMIT_ANSWERS } from '../utils/mutations';
import Auth from '../utils/auth';

const QuizContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${(props) => props.theme.cardBackground}; /* Adjusted for theme */

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const QuestionTitle = styled.h2`
  font-size: 1.2em;
  color: ${(props) => props.theme.text}; /* Adjusted for theme */
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
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px; /* Add rounded corners to the image */
  margin-bottom: 10px; /* Add spacing between the image and options */
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

const Scoreboard = styled.div`
  margin-top: 20px;
  font-size: 1.2em;
  color: ${(props) => props.theme.text};
`;

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0); // Track the score
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  const [submitAnswers] = useMutation(SUBMIT_ANSWERS);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading questions.</div>;

  const questions = data?.questions || [];

  const handleChange = (questionId, value) => {
    // Process the input by trimming spaces and converting to lowercase
    const processedAnswer = value.trim().toLowerCase();
    setAnswers({
      ...answers,
      [questionId]: processedAnswer,
    });
  };

  const handleSubmit = async () => {
    try {
      // Score calculation: Compare each answer with the correct one
      let currentScore = 0;
      questions.forEach((question) => {
        if (answers[question._id] === question.correctAnswer.toLowerCase()) {
          currentScore += 1;
        }
      });

      setScore(currentScore);
      setSubmitted(true);

      // Optionally submit the results to the server
      await submitAnswers({
        variables: { answers },
      });

    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  };

  if (submitted) {
    return (
      <QuizContainer>
        <div>Your final score is: {score} out of {questions.length}</div>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      {questions.map((question) => (
        <QuestionContainer key={question._id}>
          <Image src={question.image} alt="movie scene" />
          <QuestionTitle>Which movie is this?</QuestionTitle>
          <Input
            type="text"
            placeholder="Type your answer here"
            onChange={(e) => handleChange(question._id, e.target.value)}
          />
        </QuestionContainer>
      ))}
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      <Scoreboard>Score: {score}</Scoreboard>
    </QuizContainer>
  );
};

export default Quiz;
