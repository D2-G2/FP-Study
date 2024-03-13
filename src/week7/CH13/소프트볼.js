// 문제 1
var roster = reduce(evalutations, {}, function (roster, eval) {
  var position = eval.position;
  if (roester[position]) {
    return roster;
  }
  return objectSet(roster, position, eval.name);
});

// 문제 2
var recommendation = map(employeeNames, function (name) {
  return {
    name: name,
    position: recommendPosition(name),
  };
});

// 문제 3

// 내가 짠 코드
var evaluations = map(recommendations, function (recommendation) {
  return {
    name: recommendation.name,
    position: recommendation.position,
    score: scorePlayer(recommendation.name, recommendation.position),
  };
});

// 정답
var evaluations = map(recommendations, function (rec) {
  return objectSet(rec, "score", scorePlayer(rec.name, rec.position));
});

// 첫 번째 코드는 새로운 객체를 만들어 반환하는데, 두 번째 코드는 기존 객체에 새로운 프로퍼티를 추가한다.

// 문제 4
/* 챔피언 방어를 위해 팀을 구성해야 합니다. 앞에 세 개의 연습문제에서 만든 코드를 체이닝해 봅시다. 모든 직원 이름이 잇는 리스트를 하나의 체인으로 엮어 최종 명단을 만들어야 합니다.
앞의 연습 문제 정답 세 개 말고 다음 두 가지 함수를 이용해 높은 점수순으로 정렬된 평점 목록과 낮은 점수순으로 정렬된 평점 목록도 만들어 보세요.

sortBy(array, f), array배열을 받아 f가 리턴한 값을 우선순위로 정렬한 복사본 배열을 리턴합니다. (점수로 정렬하기 위해 필요)
reverse(array) , array 배열을 받아 역순으로 정렬된 복사본 배열을 리턴합니다.

var employeeNames = ["John", "Harry", "Jane" ,...];
 */

var recommendation = map(employeeNames, function (name) {
  return {
    name: name,
    position: recommendPosition(name),
  };
});

var evaluations = map(recommendations, function (rec) {
  return objectSet(rec, "score", scorePlayer(rec.name, rec.position));
});

var evaluationsAscending = sortBy(evaluations, function (evaluation) {
  return evaluation.score;
});

var evaluationsDescending = reverse(evaluationsAscending);

var roster = reduce(evaluations, {}, function (roster, evaluation) {
  var position = evaluation.position;
  if (roster[position]) {
    return roster;
  }
  return objectSet(roster, position, evaluation.name);
});
