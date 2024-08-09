const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'anythinnngsdf';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log(token)
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
      console.log('auth type = headers.authorization')
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(req.user)
      req.user = data;
    } catch {
      console.log('Invalid token Auth.js:30');
      console.log('token: ', token)
    }

    return req;
  },
  signToken: function ({ username, _id }) {
    const payload = { username, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
