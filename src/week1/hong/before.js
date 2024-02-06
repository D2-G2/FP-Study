/*
호출 순서
main -> affiliatePayout -> figurePayout -> sendPayout

action인 sendPayout으로 인해 모든 함수가 action이 되었다. 액션과 계산을 분리해보자.
*/

//계열사별 납입금 계산 후 송금
function figurePayout(affiliate) {
    var owed = affiliate.sales * affiliate.commission;
    if (owed > 100) { // 100달러 이하면 송금X
        sendPayout(affiliate.bank_code, owed); //action
    }
}

//자회사에 납입금을 보내는 함수
function affiliatePayout(affiliates) {
    for (var a = 0; a < affiliates.length; a++) {
        figurePayout(affiliates[a]);
    }
}

function main(affiliates) {
    affiliatePayout(affiliates);
}
