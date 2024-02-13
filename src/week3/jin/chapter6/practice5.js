// 배열 항목을 카피-온-라이트 방식으로 설정하는 arraySet() 함수를 만들어 보세요.
// a[15] = 2;

const arraySet = (arr, idx, value) => {
  const newArray = arr.slice();
  newArray[idx] = value;
  return newArray;
};

let a = [1, 2, 3, 4];
a = arraySet(a, 15, 2);
console.log(a);
