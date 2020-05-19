const isPromise = (element, f) =>
  element instanceof Promise ? element.then(f) : f(element);

module.exports = isPromise;
