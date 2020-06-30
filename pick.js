const go = require("./go");
const L = require("./L");
const object = require("./object");
const curry = require("./curry");

const pick = curry((keys, obj) =>
  go(
    keys,
    L.filter((key) => Object.keys(obj).includes(key)),
    L.map((key) => [key, obj[key]]),
    object
  )
);

module.exports = pick;

// const result = pick(["b", "c", "e"], { a: 1, b: 2, c: 3 });
// console.log(result);
