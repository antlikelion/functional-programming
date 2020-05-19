const L = require("./L");
const range = require("./range");
const curry = require("./curry");
const go = require("./go");

const nop = require("./nop");

const take = curry((limit, iterable) => {
  const result = [];

  iterable = iterable[Symbol.iterator]();

  return (function recursive() {
    let current;
    while (!(current = iterable.next()).done) {
      const element = current.value;

      if (element instanceof Promise)
        //여기서 return을 해줘버렸기 때문에 밑에서 result의 길이가 limit에 못 미치더라도
        //위의 while문으로 돌아갈 방법이 없다.
        //그래서 이 과정 전체를 재귀함수에 넣어버린 것임
        return element
          .then((resolved) =>
            //result에 resolved를 푸쉬한 뒤의 result의 길이
            (result.push(resolved), result).length == limit
              ? result
              : recursive()
          )
          .catch(
            (error) => (error === nop ? recursive() : Promise.reject(error))
            //nop은 인자가 L.filter의 조건을 충족하지 못했음을 의미함.
            //그럼 take은 조건 충족 못한 놈은 버리고 다시 limit에 도달할 때까지 이터레이터를 돌아야 함
            // 그래서 다시 재귀문 실행하는 것
            //만약 예기치 못한 에러면 그 에러 그대로
          );

      result.push(element);
      if (result.length == limit) return result;
    }
    return result;
  })();
});

// const take = curry((limit, iterable) => {
//   const result = [];

//   iterable = iterable[Symbol.iterator]();
//   let current;
//   while (!(current = iterable.next()).done) {
//     const element = current.value;
//     result.push(element);
//     if (result.length == limit) {
//       return result;
//     }
//   }
//   // 위의 명령형 코드가 아래의 선언형?으로 변형된 것임
//   // for (const element of iterable) {
//   //   result.push(element);
//   //   if (result.length == limit) {
//   //     return result;
//   //   }
//   // }
//   return result;
// });

module.exports = take;
// console.time("");
// go(range(100), take(5), console.log);
// // 이 코드의 경우 고작 5개를 뽑기 위해 길이 100의 배열을 만들어버린다.
// console.timeEnd("");
// console.time("good");
// go(L.range(Infinity), take(5), console.log);
// // 이 코드는 지연성을 갖기에 딱 5개만 뽑는다.
// // 또한 위처럼 무한대를 집어넣어도 어차피 5개의 값만을 평가한다
// console.timeEnd("good");
