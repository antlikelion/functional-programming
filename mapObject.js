const L = require("./L");
const go = require("./go");
const object = require("./object");
const curry = require("./curry");

const mapObject = curry((f, obj) =>
  go(
    obj,
    L.entries,
    L.map(([key, value]) => [key, f(value)]),
    object
  )
);

module.exports = mapObject;

// const result = mapObject((a) => a + 10, { a: 1, b: 2, c: 3 });
// console.log(result);
