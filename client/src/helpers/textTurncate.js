module.exports = (text, limit, type = "char") => {
  if (type === "char") {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  } else {
    const textArr = text.split(" ");
    return textArr.slice(0, limit).join(" ") + " ...";
  }
};
