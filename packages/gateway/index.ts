require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";
import { RemoteGraphQLDataSource } from "@apollo/gateway";

// No need to specify `serviceList` as this is read from Graph Manager
const gateway = new ApolloGateway({
  // Polls every 30 seconds for schema changes
  experimental_pollInterval: 30000,
  debug: true,

  // If it is defined then pass the authorisation header 
  // to implementing services
  // 
  buildService: ({ name, url }) =>
    new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set('Authorization', context.auth);
        console.log(request.http.headers);
      },
    }),
});

const server = new ApolloServer({
  gateway,
  // Disable subscriptions (not currently supported with ApolloGateway)
  subscriptions: false,

  // Capture inbound authorization headaer into context
  context: ({ req }) => ({
    auth: req.headers.authorization
  })
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});


