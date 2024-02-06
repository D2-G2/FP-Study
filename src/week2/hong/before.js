/*
1. map, filter, forEach 메소드를 순수 함수로 바꾸기
2. 비즈니스 로직과 유틸리티 함수를 분리하기
*/

//자회사에 납입금을 보내는 함수
function affiliatePayout(affiliates) {
    //납입금 계산
    const oweds = affiliates.map(e => {
        return {
            bank_code: e.bank_code,
            owed: e.sales * e.commission
        };
    });

    //송금여부 판단
    const payoutList = oweds.filter(e => e.owed > 100);

    //송금하기
    payoutList.forEach(e => {
        sendPayout(e.bank_code, e.owed);
    });
}

function main(affiliates) {
    affiliatePayout(affiliates);
}