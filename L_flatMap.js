const L_flatten = require("./L_flatten");
const L_map = require("./L_map");
const pipe = require("./pipe");
const curry = require("./curry");
const go = require("./go");
const map = require("./map");
const takeAll = require("./takeAll");
const L = {};
L.flatMap = curry(pipe(L_map, L_flatten));

module.exports = L.flatMap;

const result = L.flatMap(
  map((a) => a * a),
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ]
);
console.log(...result);
