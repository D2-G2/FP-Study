function map(array, f) {
  return reduce(array, [], function (accum, element) {
    accum.push(f(element));
    return accum;
  });
}

function filter(array, f) {
  return reduce(array, [], function (ret, item) {
    if (f(item)) {
      ret.push(item);
    } else {
      return ret;
    }
  });
}
