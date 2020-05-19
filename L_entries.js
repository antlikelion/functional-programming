const L = {};

L.entries = function* (obj) {
  for (const key in obj) yield [key, obj[key]];
};

module.exports = L.entries;
