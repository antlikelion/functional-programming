const go = require("./go");

const pipe = (firstFunction, ...restFunctions) => (...laterArgs) =>
  go(firstFunction(...laterArgs), ...restFunctions);

module.exports = pipe;
// const goReduce = (firstFucntion(...laterArgs), acc, iterator) => {
//   if (!iterator) {
//     iterator = acc[Symbol.iterator]();
//     acc = iterator.next().value;
//   }
//   for (const element of iterator) {
//     acc = firstFucntion(...laterArgs)(acc, element);
//   }
//   return acc;
// };
