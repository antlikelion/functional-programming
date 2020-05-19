const isIterable = require("./isIterable");

const L = {};

L.deepFlat = function* recursiveFlat(iterable) {
  for (const element of iterable) {
    if (isIterable(element)) yield* recursiveFlat(element);
    //isIterable로 element가 iterable임을 확인했으니 element에 순회를 돌도록
    // yield*구문을 적용해준 것
    else yield element;
  }
};

module.exports = L.deepFlat;
