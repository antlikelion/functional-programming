const L_flatMap = require("./L_flatMap");
const L = require("./L");
const L_flatten = require("./L_flatten");
const flatten = require("./flatten");
const takeAll = require("./takeAll");
const pipe = require("./pipe");
const curry = require("./curry");

// 아주 여러가지 방법이 있군요

// const flatMap = curry(pipe(L_flatMap, takeAll));
// const result = flatMap((v) => v, [[1], [2, 3], [4, 5, 6]]);

// const flatMap = curry(pipe(L.map, L_flatten, takeAll));
// const result = flatMap((v) => v, [[1], [2, 3], [4, 5, 6]]);

const flatMap = curry(pipe(L.map, flatten));
const result = flatMap((v) => v, [[1], [2, 3], [4, 5, 6]]);

console.log(result);
