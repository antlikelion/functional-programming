const curry = require("./curry");
const L_filter = require("./L_filter");
const go = require("./go");
const pipe = require("./pipe");
const takeAll = require("./takeAll");

// L.filter로 만드는 filter함수

const filter = curry(pipe(L_filter, takeAll));

// const filter = curry((f, iterator) => {
//   const result = [];

//   iterator = iterator[Symbol.iterator]();
//   let current;
//   while (!(current = iterator.next()).done) {
//     const element = current.value;
//     if (f(element)) {
//       result.push(element);
//     }
//   }
//   // 위의 명령형 코드가 아래의 선언형?으로 변형된 것임

//   // for (const element of iterator) {
//   //   // 사실 iterator인자로 배열 등을 받으면
//   //   // 자스 내부적으로 iterator[Symbol.iterator]를 통해 이터레이터로 변환한 후에
//   //   // 실행하는 것임
//   //   if (f(element)) {
//   //     result.push(element);
//   //   }
//   // }
//   return result;
// });

module.exports = filter;
