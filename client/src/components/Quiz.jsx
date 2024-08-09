
import  { useState, useEffect } from 'react';
import styled from 'styled-components';

const QuizContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;

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
`;

const OptionLabel = styled.label`
  display: block;
  margin: 5px 0;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #45a049;
  }
`;




const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

// needs to use the queries and mutations instead of fetching
  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    })
    .then(response => response.json())
    .then(data => {
      setResult(data.result);
      setSubmitted(true);
    });
  };

  if (submitted) {
    return <div>Your result is: {result}</div>;
  }

  return (
    <QuizContainer>
      {questions.map((question) => (
        <QuestionContainer key={question._id}>
          <Image src={question.image} alt="movie scene" />
          <QuestionTitle>{question.text}</QuestionTitle>
          {question.options.map((option) => (
            <OptionLabel key={option}>
              <input
                type="radio"
                name={question._id}
                value={option}
                onChange={() => handleChange(question._id, option)}
              />
              {option}
            </OptionLabel>
          ))}
        </QuestionContainer>
      ))}
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </QuizContainer>
  );
};

export default Quiz;
