import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

/* 
export const ADD_USER = gql`
  mutation addUser(
    $userName: String!
    $password: String!
  ) {
    addUser(
      username: $username
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
*/