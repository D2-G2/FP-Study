/*
isOwedGreaterThan 함수의 비교 로직을 Currying 기법을 사용하여 일반화해보았습니다.
*/

//자회사에 납입금을 보내는 함수
function affiliatePayout(affiliates) {
    //납입금 계산

    //송금여부 판단
    const payoutList = _filter(bankCodeAndOweds, isOwedGreaterThan);

    //송금하기
}

function isOwedGreaterThan(affiliates) {
    return affiliates.owed > 200;
}
