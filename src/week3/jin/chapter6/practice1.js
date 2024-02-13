/* 
아래는 메일링 리스트에 연락처를 추가하는 코드입니다. 이메일 주소를 전역변수인 리스트에
추가합니다. 입력 폼을 처리하는 핸들러에서 이 동작을 부릅니다.

힌트
1. add_contact()가 전역변수에 접근하면 안 됩니다. mailing_list를 인자로 받아 복사하고 
변경한 다음 리턴해야 합니다.

2. add_contact() 함수의 리턴값을 mailing_list 전역변수에 할당해야 합니다.
*/

// var mailing_list = [];

// function add_contact(email) {
//   mailing_list.push(email);
// }

// function submit_form_handler(event) {
//   var form = event.target;
//   var email = form.elements["email"].value;
//   add_contact(email);
// }

var mailing_list = [];

function add_contact(mailing_list, email) {
  let new_mailing_list = mailing_list.slice();

  new_mailing_list.push(email);
  return new_mailing_list;
}

function submit_form_handler(event) {
  var form = event.target;
  var email = form.elements["email"].value;
  mailing_list = add_contact(mailing_list, email);
}

// mailing_list 전역변수에 add_contact() 함수의 리턴값을 어떻게 할당?
