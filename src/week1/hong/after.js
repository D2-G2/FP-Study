/*
호출 순서
main  --> affiliatePayout
     |
      -->  
     |
      --> sendPayout

계산(affiliatePayout, figurePayout)과 액션(sendPayout)을 분리했다.
*/

//계열사별 납입금 계산 후 송금
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