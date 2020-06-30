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
// map을 하고 flatten을 하는 함수(함수형 프로그래밍은 이렇게 읽기가 편합니다)
// const result = flatMap((v) => v, [[1], [2, 3], [4, 5, 6]]);

module.exports = flatMap;
