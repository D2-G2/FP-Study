/*
비즈니스 로직: makeBankCodeAndOwed, isOwedGreaterThan, sendPayout
유틸리티 함수: _map, _each, _filter
*/

//자회사에 납입금을 보내는 함수
function affiliatePayout(affiliates) {
    //납입금 계산
    const bankCodeAndOweds = _map(affiliates, makeBankCodeAndOwed);

    //송금여부 판단
    const payoutList = _filter(bankCodeAndOweds, isOwedGreaterThan);

    //송금하기
    _each(payoutList, sendPayout2Affiliate);
}

function makeBankCodeAndOwed(affiliate) {
    return {
        bank_code: affiliate.bank_code,
        owed: calcOwed(affiliate.sales, affiliate.commission)
    };
}

function calcOwed(sales, commission) { //비즈니스 로직
    return sales * commission;
}

function isOwedGreaterThan(affiliates) { //비즈니스 로직
    return affiliates.owed > 200;
}

function sendPayout2Affiliate(affiliate) { //비즈니스 로직
    const {bank_code, owed} = affiliate;
    sendPayout(bank_code, owed);
}

function sendPayout(bank_code, fee) { //비즈니스 로직
    console.log(`bank code : ${bank_code}, fee : ${fee}`);
}

function _map(list, mapper) { //유틸리티 함수
    const new_list = [];

    _each(list, (val) => {
        new_list.push(mapper(val));
    })

    return new_list;
}

function _each(list, iter) { //유틸리티 함수
    for (let i = 0; i < list.length; i++) {
        iter(list[i]);
    }

    return list;
}

function _filter(list, predi) { //유틸리티 함수
    const new_list = [];

    _each(list, (val) => {
        if (predi(val)) new_list.push(val);
    });

    return new_list;
}

function main(affiliates) {
    affiliatePayout(affiliates);
}

const affiliates = [ //데이터
    {
        bank_code: 1,
        sales: 1,
        commission: 1
    },
    {
        bank_code: 2,
        sales: 2,
        commission: 500
    }
];

/* 실행 */
main(affiliates);