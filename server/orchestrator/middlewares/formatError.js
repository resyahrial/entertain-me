module.exports = (err) => {
  if (err.message.includes("was not provided")) {
    return new Error("Some required fields was not provided");
  } else if (err.message.includes("cannot represent")) {
    return new Error("Some fields has wrong type value");
  } else if (err.message.includes("code 404")) {
    return new Error("Data not found");
  } else if (err.message.includes("must have a selection of subfields")) {
    return new Error("Query was not complete");
  } else if (err.message.includes("Unknown argument")) {
    return new Error(err.message);
  }

  return err;
};
