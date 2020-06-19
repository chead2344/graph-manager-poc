require("dotenv").config();

import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const ALL_PRODUCTS = [
  { id: "1", name: "Playstation 4", brand: "Sony" },
  { id: "2", name: "XBOX 360", brand: "Microsoft" },
  { id: "3", name: "Nintendo Switch", brand: "Nintendo" },
];

const typeDefs = gql`
  type Query {
    products: [Product!]!
  }

  type Product @key(fields: "id") {
    id: ID!
    name: String!
    brand: String!
  }
`;

const resolvers = {
  Query: {
    products() {
      return ALL_PRODUCTS;
    },
  },
  Product: {
    __resolveReference(product) {
      return ALL_PRODUCTS.find((_) => _.id === product.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
