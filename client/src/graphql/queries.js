import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
  query getAllData {
    movies {
      _id
      title
      poster_path
      popularity
      tags
    }
    series {
      _id
      title
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_DETAIL_MOVIE = gql`
  query getDetailMovie($id: ID!) {
    movie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_DETAIL_SERIE = gql`
  query getDetailSerie($id: ID!) {
    serie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      message
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($id: ID!, $movieInput: MovieInput!) {
    updateMovie(id: $id, movieInput: $movieInput) {
      message
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie($movieInput: MovieInput!) {
    addMovie(movieInput: $movieInput) {
      title
    }
  }
`;
