const { Router } = require("express");

const router = Router();

const movieRouter = require("./movieRouter");

router.use("/movies", movieRouter);

module.exports = router;
