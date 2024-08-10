const typeDefs = `

  type User {
    _id: ID
    username: String!
    password: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Question {
    _id: ID
    title: String!
    url: String!
  }
  
  type Query {
    users: [User]
    questions: [Question]
    }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;