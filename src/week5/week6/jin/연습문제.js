function withArrayCopy(array, modify) {
  var copy = array.slice();
  modify(copy);
  return copy;
}

function push(array, elem) {
  return withArrayCopy(array, function (copy) {
    copy.push(elem);
  });
}

function drop_last(array) {
  return withArrayCopy(array, function (copy) {
    copy.pop();
  });
}

function drop_first(array) {
  return withArrayCopy(array, function (copy) {
    copy.shift();
  });
}

// 객체에 카피-온-라이트를 적용한 코드
function objectSet(object, key, value) {
  var copy = Object.assign({}, object);
  copy[key] = value;
  return copy;
}

function objectDelete(object, key) {
  var copy = Object.assign({}, object);
  delete copy[key];
  return copy;
}

//withObjectCopy() 함수를 만들어서 중복을 제거
function withObjectCopy(object, modify) {
  var copy = Object.assign({}, object);
  modify(copy);
  return copy;
}

function objectSet(object, key, value) {
  return withObjectCopy(object, function (copy) {
    copy[key] = value;
  });
}

function objectDelete(object, key) {
  return withObjectCopy(object, function (copy) {
    delete copy[key];
  });
}
