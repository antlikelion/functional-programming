const isIterable = require("./isIterable");
const L = {};

L.flatten = function* (iterable) {
  for (const element of iterable) {
    if (isIterable(element)) {
      yield* element;
      // 위 아래는 같은 문장임
      //   yield*iterable은 for(const val of iterable) yield val;이기 때문
      // for (const innerElement of element) yield innerElement;
    } else yield element;
  }
};

module.exports = L.flatten;
