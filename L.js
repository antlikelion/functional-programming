const curry = require("./curry");
const isPromise = require("./isPromise");

const L = {};

L.range = function* (length) {
  let i = -1;
  while (++i < length) {
    yield i;
  }
};
// L.range함수는 제너레이터이기 때문에 실행 결과 이터레이터가 반환됨.

// const list = L.range(4);
// 즉, 위와 같이 선언해도 L.range함수 내의 코드는 평가되지 않음
// 위의 함수로 반환된 이터레이터가 .next()메서드로 순회할 때마다 L.range함수의 코드가 평가되는 것임
// 이게 중요한 이유는 그냥 range함수를 실행하면 값이 이미 필요한 시점 이전에 평가가 되어버림(일종의 낭비)
// 즉, reduce와 같이 순회하여 원하는 시점에 원하는 형태로 평가하려면 L.range가 효율적
// 이러한 성질을 지연성이라고 하나봄

// for of문은 이터레이터에 .next()를 반복하며 순회하는 것임
// 근데, 이터레이터가 이터러블을 전달해주면 결국 자스가 내부적으로 이터레이터로 한 번 변환해주어야 함
// 그러니, 처음부터 이터레이터를 전달하는 것이 가벼움

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

module.exports = L;
