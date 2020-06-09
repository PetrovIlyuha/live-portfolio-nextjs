const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const {
  projectQueries,
  projectMutations,
  userMutations,
} = require("./resolvers");
const { projectTypes } = require("./types");
const Project = require("./models/Project");
const User = require("./models/User");

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${projectTypes}

    type Query {
      project(id: ID): Project
      projects: [Project]
    }

    type Mutation {
      createProject(input: ProjectInput): Project
      updateProject(id: ID, input: ProjectInput): Project
      deleteProject(id: ID): ID

      signIn: String
      signUp: String
      signOut: String
    }
  `;

  // resolvers
  const resolvers = {
    Query: { ...projectQueries },
    Mutation: { ...projectMutations, ...userMutations },
  };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Project: new Project(mongoose.model("Project")),
        User: new User(),
      },
    }),
  });
  return apolloServer;
};
