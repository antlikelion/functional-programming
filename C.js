const curry = require("./curry");
const reduce = require("./reduce");
const take = require("./take");
const pipe = require("./pipe");
const L = require("./L");

const C = {};

function noop() {}

const catchNoop = (arr) => (
  arr.forEach((element) =>
    element instanceof Promise ? element.catch(noop) : element
  ),
  arr
);
//함수를 이렇게 짜면, return 값은 arr임

C.reduce = curry((f, acc, iterable) =>
  iterable
    ? reduce(f, acc, catchNoop([...iterable]))
    : reduce(f, catchNoop([...acc]))
);
// 전개 연산자로 병렬적 평가(전개 연산자 자체가 next()로 순회를 돌면서 평가)
// 병렬적으로 평가된 코드 중에 Promise.reject로 평가될 코드가 있을 수 있음
// 여기서 그렇게 평가된 코드를 catch로 잡아주지 않으면 reduce를 돌 때 연산에는 지장이 없지만 보기 싫은 에러가 콘솔에 출력됨
// 그러니 여기서 미리 catch로 잡아주고, 아무것도 하지 않는 함수를 실행시켜준 뒤 reduce에 넘겨주는 것임
// *만약 여기서 forEach를 쓰지 않고 map을 써서 catch가 된 프로미스들을 아래로 전달한다면,
// 이후에 다시 catch를 해줄 수가 없기 때문에 보기 싫은 에러 코드를 방지하는 작업만 해준 것임
// 다시 강조하자면, forEach안의 catch는 엄밀히는 예외처리가 아니라, Promise.reject로 코드가 평가될 때의 에러 코드만 무효화시켜준 것

// 위와 같은 코드는 대기되어 있는 함수f를 비동기 제어 없이 전부 실행시킴
// 즉, L.map이나 L.filter계열의 함수들을 가로로 병렬적으로 실행시키며 아래로 내려가는 것
// 이렇게 실행시켜 놓고 reduce로 순회를 돌면서 개별적으로 비동기 제어를 해서, 앞에서부터 값을 누적시킴
// 즉, 대기하고 있는 함수를 가로방향으로 모두 실행을 시켜 놓고,
// 세로 방향에서 개별적으로 비동기 제어를 하는 것임.

C.take = curry((limit, iterable) => take(limit, catchNoop([...iterable])));

C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));

C.filter = curry(pipe(L.filter, C.takeAll));

module.exports = C;
