const pipe = require("./pipe");
const L = require("./L");
const join = require("./join");

const queryStr = pipe(
  L.entries,
  L.map(([key, value]) => `${key}=${value}`),
  join("&"),
  console.log
);

// queryStr({ limit: 10, offset: 8, type: "notice" });

module.exports = queryStr;
