const curry = require("./curry");
const reduce = require("./reduce");

const C = {};

C.reduce = curry((f, acc, iterable) =>
  iterable ? reduce(f, acc, [...iterable]) : reduce(f, [...acc])
);
// 위와 같은 코드는 대기되어 있는 함수를 비동기 제어 없이 전부 실행시킴
// 즉, 대기하고 있는 함수를 가로방향으로 모두 실행을 시켜 놓고,
// 세로 방향에서 개별적으로 비동기 제어를 하는 것임.

module.exports = C;
