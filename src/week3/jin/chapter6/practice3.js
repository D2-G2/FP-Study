// .push() 메서드를 카피-온-라이트 버전으로 만들어 보세요.
const push = (array, elem) => {
  let copy_array = array.slice();
  copy_array.push(elem);
  return copy_array;
};

// const array = [1, 2, 3, 4, 5];
// const elem = 6;
// console.log(push(array, elem));

// 위 카피-온-라이트 버전의 push() 함수를 사용해 add_contact() 함수를 리팩터링 해보시오
// const add_contact = (mailing_list, email) => {
//   var list_copy = mailing_list.slice();
//   list_copy.push(email);
//   return list_copy;
// };

const add_contact = (mailing_list, email) => {
  return push(mailing_list, email);
};

const mailing_list = ["메일1", "메일2", "메일3"];
const email = "매일4";

console.log(add_contact(mailing_list, email));
