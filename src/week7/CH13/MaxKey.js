function maxKey(array, init, f) {
  return reduce(array, init, function (biggestSoFar, element) {
    if (f(biggestSoFar) > f(element)) {
      return biggestSoFar;
    } else {
      return element;
    }
  });
}

function max(array, init) {
  return maxKey(array, init, function (x) {
    return x;
  });
}

/* 
max 함수는 maxKey 함수의 함수 f 인자로 항등 함수를 전달했다.
항등 함수는 입력값을 그대로 반환하는 함수이므로, max함수는 결국 배열의 요소 그 자체 중에서 가장 큰 값을 찾게 된다.

따라서, maxKey 함수가 더 일반적인 함수라는 의미는 maxKey 함수를 이용하면 max 함수와 같은 특수한 경우 뿐만 아니라 
다양한 형태의 함수를 적용하여 가장 큰 값을 찾는 등의 더 많은 상황에서 사용할 수 있다는 것을 의미합니다.
*/
