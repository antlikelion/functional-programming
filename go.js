const reduce = require("./reduce");

const go = (...args) => reduce((acc, f) => f(acc), args);

module.exports = go;
// const reduce = ((a, f) => f(a), acc, iterator) => {
//   if (!iterator) {
//     iterator = acc[Symbol.iterator]();
//     acc = iterator.next().value;
//   }
//   for (const element of iterator) {
//     acc = ((a, f) => f(a))(acc, element);
//   }
//   return acc;
// };
