const isIterable = (something) => something && something[Symbol.iterator];

module.exports = isIterable;
