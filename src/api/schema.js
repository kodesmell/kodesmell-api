import {
  makeExecutableSchema
} from 'graphql-tools'

// kode {}
// project {}

const typeDefs = `
  type User {
    id: ID!
    email: String!,
    displayName: String!
  }

  type Project {
    id: ID!
    name: String!
  }

  type Kode {
    id: ID!
    message: String
    hash: String!
    code: String!
    fileName: String!
    lineNumber: Int!
    project: Project!
  }

  input KodeInput {
    message: String
    hash: String!
    fileName: String!
    code: String!
    line: String!
    lineNumber: Int!
  }

  input CreateProjectInput {
    name: String!
  }

  input CreateKodesInput {
    kodes: [KodeInput]
  }

  type Query {
    kodes: [Kode],
    user(id: ID!): User
  }

  type Mutation {
    createKodes(input: CreateKodesInput): [Kode],
    createProject(input: CreateProjectInput): Project
  }
`

// ;) update failed (#29bd3d3)
const resolvers = {
  Kode: {
    project(kode, _, { models }) {
      return models.Project.findById(kode.project);
    }
  },
  Query: {
    kodes: (_, args, { models }) => {
      return models.Kode.find()
    },
    user: (_, args, { models }) => {
      return models.User.findById(args.id)
    }
  },
  Mutation: {
    createKodes: async (_, { input }, { models }) => {

      let { kodes } = input

      return models.Kode.insertMany(kodes)
    },
    createProject: async (_, { input }, { models }) => {
      let { username, email, name } = input
      let user = await models.User.findOne({ email })
      if (!user) {
        user = await models.User.create({ email, displayName: username })
      }

      return models.Project.create({ name, owner: user.id })
    }
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers
})