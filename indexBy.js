const go = require("./go");
const L = require("./L");
const object = require("./object");
const curry = require("./curry");
const takeAll = require("./takeAll");
const reduce = require("./reduce");
// const indexBy = curry((f, iterable) =>
//   go(
//     iterable,
//     L.map((element) => [f(element), element]),
//     object
//   )
// );

const indexBy = (f, iterable) =>
  reduce((obj, current) => ((obj[f(current)] = current), obj), {}, iterable);

module.exports = indexBy;

// const users = [
//   { id: 5, name: "AA", age: 35 },
//   { id: 10, name: "BB", age: 26 },
//   { id: 19, name: "CC", age: 28 },
//   { id: 23, name: "DD", age: 34 },
//   { id: 24, name: "EE", age: 23 },
// ];

// const result = indexBy((a) => a.id, users);

// const indexByFilter = curry((condition, indexByResult) =>
//   go(
//     indexByResult,
//     L.entries,
//     L.filter(([key, value]) => condition(value)),
//     object
//   )
// );

// const secondResult = indexByFilter((a) => a.age > 30, result);

// console.log(secondResult);
