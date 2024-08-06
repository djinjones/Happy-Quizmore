import { gql } from '@apollo/client';

export const GET_QUESTIONS = gql`
    {
        questions {
        _id
        movie
        images {
          url
          movie
          }
        }
    }
` 