const { User, Question } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {

    users: async () => {
      return await User.find({});
    },

    questions: async () => {
      return await Question.find({})
    },
    
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log('attempting user create')

      const user = await User.create(args);
      const token = signToken(user);
      
      return { token, user };
    },
   
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
