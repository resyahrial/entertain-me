const movieResolver = require("./movie");
const serieResolver = require("./series");

module.exports = {
  Query: {
    ...movieResolver.Query,
    ...serieResolver.Query,
  },
  Mutation: {
    ...movieResolver.Mutation,
    ...serieResolver.Mutation,
  },
};
