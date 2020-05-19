const pipe = require("./pipe");
const L_map = require("./L_map");
const join = require("./join");
const L_entries = require("./L_entries");

const queryStr = pipe(
  L_entries,
  L_map(([key, value]) => `${key}=${value}`),
  join("&"),
  console.log
);

queryStr({ limit: 10, offset: 8, type: "notice" });

module.exports = queryStr;
