require("dotenv").config();

import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const ALL_REVIEWS = [
  { id: "900", productId: "1", message: "It's great!" },
  { id: "901", productId: "1", message: "The fans are really loud." },
  { id: "902", productId: "2", message: "Not as good as my Playstation 4" },
  { id: "903", productId: "3", message: "I love Mario!" },
];

const typeDefs = gql`
  type Query {
    reviews: [Review!]!
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
    reviews: [Review!]!
  }

  type Review @key(fields: "id") {
    id: ID!
    message: String!
    product: Product!
  }
`;

const resolvers = {
  Query: {
    reviews() {
      return ALL_REVIEWS;
    },
  },
  Review: {
    __resolveReference(review) {
      return ALL_REVIEWS.find((_) => _.id === review.id);
    },
    product(review) {
      return { __typename: "Product", id: review.productId };
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
