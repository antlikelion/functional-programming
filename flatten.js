const L_flatten = require("./L_flatten");
const pipe = require("./pipe");
const takeAll = require("./takeAll");
const flatten = pipe(L_flatten, takeAll);

module.exports = flatten;
