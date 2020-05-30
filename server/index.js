const express = require("express");
const next = require("next");
const { ApolloServer, gql } = require("apollo-server-express");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// resolvers
const { projectQueries, projectMutations } = require("./graphql/resolvers");
// types
const { projectTypes } = require("./graphql/types");
app.prepare().then(() => {
  const server = express();

  // graphql schema
  const typeDefs = gql`
    ${projectTypes}

    type Query {
      hello: String
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
  });
  apolloServer.applyMiddleware({ app: server });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
