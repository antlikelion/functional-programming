const take = require("./take");
const L = require("./L");
const curry = require("./curry");
const pipe = require("./pipe");

const find = curry(pipe(L.filter, take(1), ([result]) => result));

module.exports = find;

// const users = [
//   { age: 32 },
//   { age: 31 },
//   { age: 37 },
//   { age: 28 },
//   { age: 25 },
//   { age: 32 },
//   { age: 31 },
//   { age: 37 },
// ];

// const result = find((user) => user.age < 30)(users);
