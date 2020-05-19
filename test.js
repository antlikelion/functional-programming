const add = (acc, current) => acc + current;

const test = (name, time, f) => {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
};

module.exports = test;
