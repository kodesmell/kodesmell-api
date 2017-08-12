import {
  makeExecutableSchema
} from 'graphql-tools'

const typeDefs = `
  type User {
    id: ID!
    email: String
  }

  type Code {
    id: ID!
    message: String
    hash: String
    fileName: String
    lineNumber: String
  }

  input CodeInput {
    message: String
    hash: String!
    fileName: String
    code: String
    line: String
    lineNumber: String
  }

  type Query {
    codes: [Code],
    user(id: ID!): User
  }

  type Mutation {
    newCode(input: [CodeInput]): [Code]
  }
`

// ;) update failed (#29bd3d3)
const resolvers = {
  Query: {
    codes: (_, args, { models }) => {
      return models.Code.find()
    },
    user: (_, args, { models }) => {
      return models.User.findById(args.id)
    }
  },
  Mutation: {
    newCode: async (_, { input }, { models }) => {
      return models.Code.insertMany(input)
    }
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
})