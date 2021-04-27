const { ObjectId } = require("mongodb");

const { getCollection } = require("../config/mongodb");

const COLLECTION = "movies";

class Movie {
  static findAll() {
    return getCollection(COLLECTION).find().toArray();
  }

  static findById(id) {
    return getCollection(COLLECTION).findOne({
      _id: ObjectId(id),
    });
  }

  static create(newItem) {
    return getCollection(COLLECTION).insertOne(newItem);
  }

  static updateById(id, updateItem) {
    return getCollection(COLLECTION).updateOne(
      { _id: ObjectId(id) },
      { $set: updateItem }
    );
  }

  static deleteById(id) {
    return getCollection(COLLECTION).deleteOne({
      _id: ObjectId(id),
    });
  }
}

module.exports = Movie;
