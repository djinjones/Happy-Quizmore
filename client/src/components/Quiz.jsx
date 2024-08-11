
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { GET_QUESTIONS } from '../utils/queries';

const QuizContainer = styled.div`
  display:flex;
  max-width: 840px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  scroll-snap-type: x mandatory;
 
  overflow-x: scroll;

  @media (max-width: 768px) {
    padding: 10px;
    min-with: 430px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    min-width: 350px;
  }
`;

const QuestionContainer = styled.div`
  min-height: 400px;
  min-width: 800px;
  padding: 20px;
  scroll-snap-align: center;

  @media (max-width: 768px) {
    padding: 10px;
    min-with: 430px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    min-width: 350px;
  }
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

  const handleSubmit = (e) => {
    setSubmitted(true);
    const answer = e.target.value;
    const quesitonId = e.target.
    console.log('you answered: ', answer);
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