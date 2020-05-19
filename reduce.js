const curry = require("./curry");
const isPromise = require("./isPromise");
const nop = require("./nop");
const take = require("./take");

const isCurrentPromise = (acc, current, f) =>
  current instanceof Promise
    ? current.then(
        (resolvedCurrent) => f(acc, resolvedCurrent),
        (error) => (error == nop ? acc : Promise.reject(error))
      ) //이렇게 then의 두 번째 인자로 reject를 전달할 수 있음
    : //nop은 인자가 L.filter의 조건을 충족하지 못했음을 의미함
      //그러니 reduce에서는 조건 충족 못한 놈을 acc와 함께 함수 적용해버리면 안 댐.
      //그래서 해당 인자를 acc와 함께 함수 적용하지 않고 acc만 그대로 내보내는 것
      f(acc, current);

const head = (iterator) =>
  isPromise(take(1, iterator), ([headOfIter]) => headOfIter);

const reduce = curry((f, acc, iterator) => {
  if (!iterator)
    return reduce(f, head((iterator = acc[Symbol.iterator]())), iterator);

  iterator = iterator[Symbol.iterator]();
  // isAccPromise는 go함수에 첫번째 인자로 프로미스값이 올 경우를 대비한 것임
  return isPromise(acc, function recursive(acc) {
    let current;
    while (!(current = iterator.next()).done) {
      acc = isCurrentPromise(acc, current.value, f);
      //f가 프로미스를 반환하는 함수일 경우 then으로 resolve시켜주려는 것
      if (acc instanceof Promise) return acc.then(recursive);
      //어쨌거나 acc가 한 번이라도 프로미스 값이 되었으면 최종 return 값은 프로미스임
      // (반드시 그런 건 아님 ^^;ㅅㅂ)
      //여기서 재귀를 도는 이유는 동기값?으로 연산해주기 위함임
      //그냥 순회를 돌 수도 있지만 그러면 계속 비동기값으로 연산하게 되고 연산의 비효율이 발생함
    }
    return acc;
  });
  // 함수를 기명(유명)함수로 선언하는 동시에 실행
  // 함수를 값으로 다루면서 함수의 이름을 짓는 것임

  // 아래는 비동기 상황을 고려하지 않은 코드
  // 명령형 코드
  // let current;
  // while (!(current = iterator.next()).done) {
  //   const element = current.value;
  //   acc = f(acc, element);
  // }
  // 위의 명령형 코드가 아래의 선언형?으로 변형된 것임

  // for (const element of iterator) {
  //   //사실 iterator인자로 배열 등을 받으면
  //   // 자스 내부적으로 iterator[Symbol.iterator]를 통해 이터레이터로 변환한 후에
  //   // 실행하는 것임
  //   acc = f(acc, element);
  // }
  // return acc;
});

module.exports = reduce;
