const go = require("./go");
const map = require("./map");
const L_filter = require("./L_filter");
const take = require("./take");
const L_map = require("./L_map");
const reduce = require("./reduce");
const filter = require("./filter");

const add = (a, b) => a + b;
const delay500 = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 500));
console.time("1");
go(
  [1, 2, 3, 4, 5],
  map((a) => delay500(a * a)),
  filter((a) => {
    console.log(a);
    return a % 2;
  }),
  reduce(add),
  console.log
);
console.timeEnd("1");
console.time("2");
go(
  [1, 2, 3, 4, 5],
  L_map((a) => delay500(a * a)),
  L_filter((a) => {
    console.log(a);
    return a % 2;
  }),
  reduce(add),
  console.log
);
console.timeEnd("2");
