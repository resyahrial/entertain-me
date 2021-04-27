module.exports = (data) => {
  return [...new Set(data.map((data) => data.tags).flat())].sort(() =>
    Math.floor(0.5 - Math.random())
  );
};
