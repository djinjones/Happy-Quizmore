import { gql } from '@apollo/client';

export const GET_USERS = gql`
query Users {
  users {
    username
  }
}
`;

export const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      _id
      image
      correctAnswer
    }
  }
`;

export const SUBMIT_ANSWERS = gql`
  mutation SubmitAnswers($answers: [AnswerInput!]!) {
    submitAnswers(answers: $answers) {
      result
    }
  }
`;
// query Query {
//   questions {
//     _id
//     title
//     url
//   }
// }
// ` ;
