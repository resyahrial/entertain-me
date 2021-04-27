if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./config/mongodb");
const router = require("./routes");
const { errHandler } = require("./middlewares");

const app = express();
const PORT = process.env.PORT || 4002;

dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Series Service server run on http://localhost:${PORT}`);
});
