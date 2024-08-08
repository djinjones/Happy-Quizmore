const typeDefs = `

  type User {
    _id: ID
    userName: String!
    password: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Question {
    _id: ID
    title: String
    url: String
  }
  
  type Query {
  users: [User]
  questions: [Question]
  }

  type Mutation {
    addUser(userName: String!, password: String!): Auth
    updateUser(userName: String, password: String): User
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;