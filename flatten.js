const L = require("./L");
const pipe = require("./pipe");
const takeAll = require("./takeAll");
const flatten = pipe(L.flatten, takeAll);

module.exports = flatten;
