const { MongoClient } = require("mongodb");

const URI = process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017";
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = null;

const dbConnection = async () => {
  try {
    await client.connect();
    db = client.db("db_entertainme");
    console.log("Database connected");
  } catch (err) {
    console.log("Database connection failed");
    console.log(err);
  }
};

const getCollection = (collection) => {
  return db.collection(collection);
};

module.exports = {
  client,
  getCollection,
  dbConnection,
};
