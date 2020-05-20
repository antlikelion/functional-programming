const L = require("./L");
const flatten = require("./flatten");
const pipe = require("./pipe");
const curry = require("./curry");

// 아주 여러가지 방법이 있군요

// const flatMap = curry(pipe(L.flatMap, takeAll));
// const result = flatMap((v) => v, [[1], [2, 3], [4, 5, 6]]);

// const flatMap = curry(pipe(L.map, L.flatten, takeAll));
// const result = flatMap((v) => v, [[1], [2, 3], [4, 5, 6]]);

const flatMap = curry(pipe(L.map, flatten));
// const result = flatMap((v) => v, [[1], [2, 3], [4, 5, 6]]);

module.exports = flatMap;
