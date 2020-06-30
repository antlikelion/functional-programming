const pipe = require("./pipe");
const L = require("./L");
const reduce = require("./reduce");

// const object = pipe(
//   L.map(([key, value]) => ({ [key]: value })),
//   reduce(Object.assign)
// );

const object = (entries) =>
  reduce(
    (obj, [key, value]) => ((obj[key] = value), obj),
    // {
    //   if (!obj[key]) obj[key] = value;
    //   return obj;
    // },
    {},
    entries
  );

module.exports = object;
