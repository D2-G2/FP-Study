/*
isOwedGreaterThan 함수를 커링 함수인 isGreaterThan 를 사용하여 일반화,
isGreaterThan 함수의 재사용성을 높였습니다.
*/

//자회사에 납입금을 보내는 함수
function affiliatePayout(affiliates) {
    //납입금 계산

    //송금여부 판단
    const payoutList = _filter(bankCodeAndOweds, isOwedGreaterThan);

    //송금하기
}

const isGreaterThan = (standard) => (num) => standard < num;

function isOwedGreaterThan(affiliates) { //currying
    const isGreaterThan200 = isGreaterThan(200);
    return isGreaterThan200(affiliates.owed);
}
