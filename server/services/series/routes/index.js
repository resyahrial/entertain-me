const { Router } = require("express");

const router = Router();

const seriesRouter = require("./seriesRouter");

router.use("/series", seriesRouter);

module.exports = router;
