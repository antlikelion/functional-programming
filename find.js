const take = require("./take");
const L_filter = require("./L_filter");
const curry = require("./curry");
const pipe = require("./pipe");
const go = require("./go");

const find = curry(pipe(L_filter, take(1), ([result]) => result));

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

// find((user) => user.age < 30)(users);
