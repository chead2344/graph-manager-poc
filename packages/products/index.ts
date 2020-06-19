require("dotenv").config();

import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const PRODUCTS = [
  { id: "1", name: "Playstation 4" },
  { id: "2", name: "XBOX 360" },
  { id: "3", name: "Nintendo Switch" },
];

const typeDefs = gql`
  type Query {
    products: [Product!]!
  }

  type Product @key(fields: "id") {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    products() {
      return PRODUCTS;
    },
  },
  Product: {
    __resolveReference(product) {
      return PRODUCTS.find((_) => _.id === product.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
