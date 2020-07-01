const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');

const {
  projectQueries,
  projectMutations,
  userMutations,
  userQueries,
} = require('./resolvers');
const { projectTypes, userTypes } = require('./types');
const { buildAuthContext } = require('./context');

const Project = require('./models/Project');
const User = require('./models/User');

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${projectTypes}
    ${userTypes}

    type Query {
      project(id: ID): Project
      projects: [Project]
      userProjects: [Project]
      user: User
    }

    type Mutation {
      createProject(input: ProjectInput): Project
      updateProject(id: ID, input: ProjectInput): Project
      deleteProject(id: ID): ID

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: Boolean
    }
  `;

  // resolvers
  const resolvers = {
    Query: { ...projectQueries, ...userQueries },
    Mutation: { ...projectMutations, ...userMutations },
  };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Project: new Project(mongoose.model('Project'), req.user),
        User: new User(mongoose.model('User')),
      },
    }),
  });
  return apolloServer;
};
