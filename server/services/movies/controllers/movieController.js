const { Movie } = require("../models");
const redis = require("../config/redis");

const CACHE_TYPE = "entertainme/movies";

class Controller {
  static async findAll(req, res, next) {
    try {
      const moviesCache = await redis.get(CACHE_TYPE);
      if (moviesCache) {
        res.status(200).json(JSON.parse(moviesCache));
        return;
      }

      const movies = await Movie.findAll();
      await redis.set(CACHE_TYPE, JSON.stringify(movies));
      res.status(200).json(movies);
    } catch (err) {
      next(err);
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params;

      let moviesCache = await redis.get(CACHE_TYPE);
      if (moviesCache) {
        moviesCache = JSON.parse(moviesCache);
        const filteredData = moviesCache.filter((movie) => movie._id === id);
        if (filteredData.length > 0) {
          res.status(200).json(filteredData[0]);
          return;
        }
      }

      const movie = await Movie.findById(id);

      if (!movie) {
        throw { name: "Movie not found" };
      }

      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const newMovie = { title, overview, poster_path, popularity, tags };

      const movie = await Movie.create(newMovie);

      await redis.del(CACHE_TYPE);
      res.status(200).json(movie.ops[0]);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const { deletedCount } = await Movie.deleteById(id);
      if (deletedCount < 1) {
        throw { name: "Movie not found" };
      }

      await redis.del(CACHE_TYPE);
      res.status(200).json({ message: "Movie deleted succesfully" });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const updatedData = { title, overview, poster_path, popularity, tags };

      const { modifiedCount } = await Movie.updateById(id, updatedData);
      if (modifiedCount < 1) {
        throw { name: "Movie not found" };
      }

      await redis.del(CACHE_TYPE);
      res.status(200).json({ message: "Movie has been updated" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
