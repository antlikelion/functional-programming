const range = (length) => {
  let i = -1;
  let result = [];
  while (++i < length) {
    result.push(i);
  }
  return result;
};
// range함수를 실행하면 배열로 평가가 된다

// const list = range(4);
// 위와 같이 실행하면 range함수 내의 코드가 평가가 되는 것임
// 하지만 naive-L.range는 다름

module.exports = range;

// go(range(4), reduce(add), console.log);
