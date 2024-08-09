import { gql } from '@apollo/client';

export const GET_USERS = gql`
query Users {
  users {
    username
  }
}
`

export const GET_QUESTIONS = gql`
    {
        questions {
        _id
        title
        images {
          url
          title
          }
        }
    }
` 