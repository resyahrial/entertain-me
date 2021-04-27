const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const Redis = require("ioredis");
const redis = new Redis(REDIS_URL);

module.exports = redis;
