
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { GET_QUESTIONS } from '../utils/queries';

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
  background-color: grey;
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

const Quiz = (props) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log('current questions state: ', questions);
  
  const client = useApolloClient();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await client.query({
          query: GET_QUESTIONS,
        });
        setQuestions(data.questions);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [client]);

  const handleChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) return <div>Your result is: {result}</div>;
  if (error) return <p>Error loading questions</p>;
  if (loading) return <p>Loading...</p>

  return (
    <QuizContainer>
      {questions && questions.length > 0 ? (
        questions.map((question) => (
          <QuestionContainer key={question._id}>
            <Image src={question.url} alt="movie scene" />
            <QuestionTitle>Which movie is this?</QuestionTitle>
            <input className='movie-answer-input' question-id-input={question._id} type='text' placeholder='movie title here' />
            <SubmitButton className='movie-answer-submit' question-id-submit={question._id} onClick={handleSubmit}>Submit</SubmitButton>
          </QuestionContainer>
        ))
      ) : (
        <p>No questions available</p>
      )}
      
    </QuizContainer>
  );
};

export default Quiz;


/* removed from inside the questionContainer
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
*/