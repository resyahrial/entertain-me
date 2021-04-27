const axios = require("axios");

const redis = require("../../config/redis");

const CACHE_TYPE = "entertainme/movies";

const movie = axios.create({
  baseURL: process.env.MOVIE_URL || "http://localhost:4001/movies",
});

module.exports = {
  Query: {
    movies: async () => {
      try {
        const moviesCache = await redis.get(CACHE_TYPE);
        if (moviesCache) {
          return JSON.parse(moviesCache);
        }

        const { data } = await movie("/");
        await redis.set(CACHE_TYPE, JSON.stringify(data));
        return data;
      } catch (err) {
        throw err;
      }
    },
    movie: async (_, args) => {
      try {
        let moviesCache = await redis.get(CACHE_TYPE);
        if (moviesCache) {
          moviesCache = JSON.parse(moviesCache);
          const filteredData = moviesCache.filter(
            (movie) => movie._id === args.id
          );
          if (filteredData.length > 0) return filteredData[0];
        }

        const { data } = await movie(`/${args.id}`);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const { data } = await movie.post("/", args.movieInput);
        await redis.del(CACHE_TYPE);
        return data;
      } catch (err) {
        throw err;
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const { data } = await movie.delete(`/${args.id}`);
        await redis.del(CACHE_TYPE);
        return data;
      } catch (err) {
        throw err;
      }
    },
    updateMovie: async (_, args) => {
      const { id, movieInput } = args;
      try {
        const { data } = await movie.put(`/${id}`, movieInput);
        await redis.del(CACHE_TYPE);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};
