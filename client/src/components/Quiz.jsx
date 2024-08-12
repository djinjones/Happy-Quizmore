
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation,  useApolloClient } from '@apollo/client';
import { GET_QUESTIONS } from '../utils/queries';



const QuizContainer = styled.div`
  display:flex;
  max-width: 840px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 10px;
    min-with: 430px;
  }

  @media (max-width: 480px) {
    padding: 5px;
    min-width: 350px;
  }
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
  padding: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const LeftButton = styled(ScrollButton)`
  left: -40px;
`;

const RightButton = styled(ScrollButton)`
  right: -40px;
`;

const QuestionContainer = styled.div`
  min-height: 400px;
  min-width: 800px;
  padding: 20px;
  scroll-snap-align: center;
  background-color: ${({ iscorrect }) => 
    iscorrect === null 
      ? 'transparent' 
      : iscorrect 
      ? 'rgba(0, 255, 0, 0.3)' 
      : 'rgba(255, 0, 0, 0.3)'
  };
  transition: background-color 0.3s ease-in-out;

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




const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answerStatus, setAnswerStatus] = useState({});
  
  
  // for debugging only: console.log('current questions state: ', questions);
  
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

        console.log(questions);
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
    if (quizContainerRef.current) {
      quizContainerRef.current.scrollBy({ left: -800, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (quizContainerRef.current) {
      quizContainerRef.current.scrollBy({ left: 800, behavior: 'smooth' });
    }
  };

  const handleSubmit = (questionId, i) => {
    const userAnswer = answers[questionId];
    const question = questions.find(q => q._id === questionId);
    const index = i+1;
    const iscorrect = question && userAnswer && userAnswer.toLowerCase() === question.title.toLowerCase();
    
    if (iscorrect) {
      setResult(prevResult => prevResult + 1); // Increment score if correct
      console.log('Correct! You answered: ', userAnswer, ' for question #', index);
    } else {
      console.log('Incorrect! You answered: ', userAnswer, ' for question #', index)
    }
  
    setAnswerStatus(prevStatus => ({
      ...prevStatus,
      [question._id]: iscorrect !== undefined ? iscorrect : null // Update to true/false, keep null if not answered
    }));
    
    console.log('Submitted answer for question ID:', questionId, 'Answer:', userAnswer);
  };

  if (submitted) return <div>Your result is: {result}</div>;
  if (error) return <p>Error loading questions</p>;
  if (loading) return <p>Loading...</p>

  return (
    <div style={{ position: 'relative' }}>
      <LeftButton onClick={handleScrollLeft}>{'<'}</LeftButton>
      <QuizContainer ref={quizContainerRef}>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <QuestionContainer key={index} iscorrect={answerStatus[question._id]}>
              <Image src={question.url} alt="movie scene" />
              <QuestionTitle>Which movie is this?</QuestionTitle>
              <input 
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
      </QuizContainer>
      <RightButton onClick={handleScrollRight}>{'>'}</RightButton>
    </div>
  );
};

export default Quiz;


/* 
<p>{index}</p>
 data-number={index}
removed from inside the questionContainer
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