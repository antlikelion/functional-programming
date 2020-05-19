const curry = require("./curry");
const isPromise = require("./isPromise");
const L = {};

const nop = require("./nop");
// reject에 이렇게 인자를 전달해주는 것은 그냥 일반 에러와 구분하기 위함임.
// 클레이슬리 컴포지션에 의하면 이렇게 전달해야 뒤에 함수를 아무것도 실행하지 않는다는 의도가 보임

L.filter = curry(function* (f, iterable) {
  iterable = iterable[Symbol.iterator]();
  for (const element of iterable) {
    const condition = isPromise(element, f);
    // element가 프로미스라면 isPromise는 프로미스를 반환한다
    if (condition instanceof Promise)
      yield condition.then((resolvedCondition) =>
        resolvedCondition ? element : Promise.reject(nop)
      );
    // 여기서 element가 프로미스임에도 그대로 반환해주는 이유는 어차피 L.filter가 결과를 만드는 함수가 아니기 때문임
    // 어차피 다른 결과를 만드는 함수에서 then으로 resolve될 것임
    else if (condition) yield element;
  }
});

// 아래는 비동기 고려안함
// L.filter = curry(function* (f, iterable) {
//   iterable = iterable[Symbol.iterator]();
//   let current;
//   while (!(current = iterable.next()).done) {
//     if (f(current.value)) yield current.value;
//   }
//   // 위의 명령형 코드가 아래의 선언형?으로 변형된 것임
//   // for (const element of iterable) if (f(element)) yield element;
// });

// const iterator = L.filter((a) => a % 2, [1, 2, 3, 4]);
// console.log(iterator.next()); // 1
// console.log(iterator.next()); // 3
// 즉, next()를 할 때마다 yield하는 것

module.exports = L.filter;
