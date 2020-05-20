const curry = require("./curry");
const pipe = require("./pipe");
const isPromise = require("./isPromise");
const isIterable = require("./isIterable");

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

L.flatMap = curry(pipe(L.map, L.flatten));

L.entries = function* (obj) {
  for (const key in obj) yield [key, obj[key]];
};

L.deepFlat = function* recursiveFlat(iterable) {
  for (const element of iterable) {
    if (isIterable(element)) yield* recursiveFlat(element);
    //isIterable로 element가 iterable임을 확인했으니 element에 순회를 돌도록
    // yield*구문을 적용해준 것
    else yield element;
  }
};

module.exports = L;
