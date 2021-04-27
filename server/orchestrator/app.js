const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { formatError } = require("./middlewares");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
