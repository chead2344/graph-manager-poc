require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";

// No need to specify `serviceList` as this is read from Graph Manager
const gateway = new ApolloGateway({
  // Polls every 30 seconds for schema changes
  experimental_pollInterval: 30000,
  debug: true,
});

const server = new ApolloServer({
  gateway,
  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
