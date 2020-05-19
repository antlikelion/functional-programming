const curry = (f) => (firstArg, ...currentArgs) =>
  currentArgs.length
    ? f(firstArg, ...currentArgs)
    : (...laterArgs) => f(firstArg, ...laterArgs);

module.exports = curry;
//함수를 반환하는 거니까 클로저를 반환하는 것임.
// 즉, 반환된 (...laterArgs) => f(firstArg, ...laterArgs)는 firstArg를 기억하고 있음
// curry함수로 인해, iterator는 나중에 받는 인자가 되었음
