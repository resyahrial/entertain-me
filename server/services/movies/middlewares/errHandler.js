module.exports = (err, req, res, next) => {
  if (!err) {
    return;
  }

  let error = {
    status: 500,
    message: "Internal server error",
  };

  switch (err.name) {
    case "Movie not found":
    case "Tv Series not found":
      error = {
        ...error,
        status: 404,
        message: err.name,
      };
      break;
    default:
      break;
  }

  res.status(error.status).json({ message: error.message });
};
