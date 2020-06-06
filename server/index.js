const express = require("express");
const next = require("next");
global.fetch = require("node-fetch");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// mongo db connection
require("./database").connect();

app.prepare().then(() => {
  const server = express();
  const apolloServer = require("./graphql/index").createApolloServer();
  apolloServer.applyMiddleware({ app: server });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
