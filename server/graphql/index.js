const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const { projectQueries, projectMutations } = require("./resolvers");
const { projectTypes } = require("./types");
const Project = require("./models/Project");

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
    }
  `;

  // resolvers
  const resolvers = {
    Query: { ...projectQueries },
    Mutation: { ...projectMutations },
  };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Project: new Project(mongoose.model("Project")),
      },
    }),
  });
  return apolloServer;
};
