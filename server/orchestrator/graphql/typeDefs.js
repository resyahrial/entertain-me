const { gql } = require("apollo-server");

module.exports = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Serie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Message {
    message: String
  }

  input MovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  input SerieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
    series: [Serie]
    serie(id: ID!): Serie
  }

  type Mutation {
    addMovie(movieInput: MovieInput): Movie
    deleteMovie(id: ID!): Message
    updateMovie(id: ID!, movieInput: MovieInput): Message
    addSerie(serieInput: SerieInput): Serie
    deleteSerie(id: ID!): Message
    updateSerie(id: ID!, serieInput: SerieInput): Message
  }
`;
