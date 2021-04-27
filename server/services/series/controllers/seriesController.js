const { Series } = require("../models");
const redis = require("../config/redis");

const CACHE_TYPE = "entertainme/series";

class Controller {
  static async findAll(req, res, next) {
    try {
      const seriesChace = await redis.get(CACHE_TYPE);
      if (seriesChace) {
        res.status(200).json(JSON.parse(seriesChace));
        return;
      }

      const series = await Series.findAll();
      await redis.set(CACHE_TYPE, JSON.stringify(series));
      res.status(200).json(series);
    } catch (err) {
      next(err);
    }
  }

  static async findById(req, res, next) {
    try {
      const { id } = req.params;

      let seriesCahce = await redis.get(CACHE_TYPE);
      if (seriesCahce) {
        seriesCahce = JSON.parse(seriesCahce);
        const filteredData = seriesCahce.filter((series) => series._id === id);
        if (filteredData.length > 0) {
          res.status(200).json(filteredData[0]);
          return;
        }
      }

      const series = await Series.findById(id);

      if (!series) {
        throw { name: "Tv Series not found" };
      }

      res.status(200).json(series);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const newSeries = { title, overview, poster_path, popularity, tags };

      const series = await Series.create(newSeries);

      await redis.del(CACHE_TYPE);
      res.status(200).json(series.ops[0]);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const { deletedCount } = await Series.deleteById(id);
      if (deletedCount < 1) {
        throw { name: "Tv Series not found" };
      }

      await redis.del(CACHE_TYPE);
      res.status(200).json({ message: "Tv Series deleted succesfully" });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const updatedData = { title, overview, poster_path, popularity, tags };

      const { modifiedCount } = await Series.updateById(id, updatedData);
      if (modifiedCount < 1) {
        throw { name: "Tv Series not found" };
      }

      await redis.del(CACHE_TYPE);
      res.status(200).json({ message: "Tv Series has been updated" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
