const curry = require("./curry");
const L = require("./L");
const pipe = require("./pipe");
const takeAll = require("./takeAll");

// L.map으로 만드는 map함수

// 1.
// const map = curry((f, iterable) =>
//   go(iterable, L.map(f), take(Infinity), console.log)
// );

// 2.
// const map = curry((f, iterable) =>
//   go(L.map(f, iterable), take(Infinity), console.log)
// );

// 3.
const map = curry(pipe(L.map, takeAll));

// const map = curry((f, iterator) => {
//   const result = [];

//   iterator = iterator[Symbol.iterator]();
//   let current;
//   while (!(current = iterator.next()).done) {
//     const element = current.value;
//     result.push(f(element));
//   }
//   // 위의 명령형 코드가 아래의 선언형?으로 변형된 것임

//   // for (const element of iterator) {
//   //   //사실 iterator인자로 배열 등을 받으면
//   //   // 자스 내부적으로 iterator[Symbol.iterator]를 통해 이터레이터로 변환한 후에
//   //   // 실행하는 것임
//   //   result.push(f(element));
//   // }
//   return result;
// });

module.exports = map;
