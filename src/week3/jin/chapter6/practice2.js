// var a = [1, 2, 3, 4];
// var b = a.pop();
// console.log(b);
// console.log(a);

// 1. 읽기 함수와 쓰기 함수로 분리하기
// const last_element = (a) => {
//   return a[a.length - 1];
// };

// // const left_element = (a) => {
// //   a.pop();
// // };

// // left_element 함수를 카피-온-라이트로 바꾸자
// const left_element = (a) => {
//   var a_copy = a.slice();
//   a_copy.pop();
//   return a_copy;
// };

// var a = [1, 2, 3, 4];
// console.log(last_element(a));
// console.log(left_element(a));

// 2. 값 두 개를 리턴하는 함수로 만들기
// const pop = (a) => {
//   return a.pop();
// };
// 위 함수를 값 두개를 반환하는 카피-온-라이트로 변경
const pop = (a) => {
  var a_copy = a.slice();
  var last = a_copy.pop();
  return {
    last: last,
    array: a_copy,
  };
};

var a = [1, 2, 3, 4];
console.log(pop(a));
