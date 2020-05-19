const go = require("./go");
const reduce = require("./reduce");
const curry = require("./curry");
const isPromise = require("./isPromise");

const add = (acc, current) => acc + current;

const L = {};
L.map = curry(function* (f, iterable) {
  for (const element of iterable) yield isPromise(element, f);
  // 만약 element가 프로미스라면 isPromise의 반환값도 프로미스임
});

// 아래는 비동기 고려안함.
// L.map = curry(function* (f, iterable) {
//   // iterable = iterable[Symbol.iterator]();
//   // let current;
//   // while (!(current = iterable.next()).done) {
//   //   const element = current.value;
//   //   yield f(element);
//   // }
//   // 위의 명령형 코드가 아래의 선언형?으로 변형된 것임
//   for (const element of iterable) yield f(element);
// });

// go(
//   L.map((element) => element + 10, [1, 2, 3]),
//   reduce(add),
//   console.log
// );

module.exports = L.map;
