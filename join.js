const reduce = require("./reduce");
const curry = require("./curry");

const join = curry((separator = ",", iterable) =>
  reduce((acc, current) => `${acc}${separator}${current}`, iterable)
);

module.exports = join;
