/* 
MegaMart는 급여 계산을 위해 외부 라이브러리를 사용.
모든 직원을 payrollCalc() 함수에 배열 형태로 넘기면 급여가 배열로 리턴됨.
이 함수는 신뢰할 수 없는 코드. 직원 배열이 바뀔수도 있고, 급여 계산에 무슨 영향을 끼칠지 알 수 없음
payrollCalc() 함수에 방어적 복사를 적용해 안전하게 만들어 보자
*/

// const payrollCalc = (employees) => {
//     ...
//     return payrollChecks;
// };

// payrollCalc() 를 감싼 payrollCalcSafe() 함수를 만들어 보자
const payrollCalcSafe = (employees) => {
  let copy = deepCopy(employees);
  let payrollChecks = payrollCalc(copy);
  return deepCopy(payrollChecks);
};
