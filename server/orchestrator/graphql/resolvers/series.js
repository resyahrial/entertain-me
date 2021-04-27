const axios = require("axios");

const redis = require("../../config/redis");

const CACHE_TYPE = "entertainme/series";

const serie = axios.create({
  baseURL: process.env.MOVIE_URL || "http://localhost:4002/series",
});

module.exports = {
  Query: {
    series: async () => {
      try {
        const seriesCache = await redis.get(CACHE_TYPE);
        if (seriesCache) {
          return JSON.parse(seriesCache);
        }

        const { data } = await serie("/");
        await redis.set(CACHE_TYPE, JSON.stringify(data));
        return data;
      } catch (err) {
        throw err;
      }
    },
    serie: async (_, args) => {
      try {
        let seriesCache = await redis.get(CACHE_TYPE);
        if (seriesCache) {
          seriesCache = JSON.parse(seriesCache);
          const filteredData = seriesCache.filter(
            (serie) => serie._id === args.id
          );
          if (filteredData.length > 0) return filteredData[0];
        }

        const { data } = await serie(`/${args.id}`);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addSerie: async (_, args) => {
      try {
        const { data } = await serie.post("/", args.serieInput);
        await redis.del(CACHE_TYPE);
        return data;
      } catch (err) {
        throw err;
      }
    },
    deleteSerie: async (_, args) => {
      try {
        const { data } = await serie.delete(`/${args.id}`);
        await redis.del(CACHE_TYPE);
        return data;
      } catch (err) {
        throw err;
      }
    },
    updateSerie: async (_, args) => {
      const { id, serieInput } = args;
      try {
        const { data } = await serie.put(`/${id}`, serieInput);
        await redis.del(CACHE_TYPE);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};
