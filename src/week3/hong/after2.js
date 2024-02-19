const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const {UnauthorizedError} = require('../middleware/errorHandler');
const _ = require('lodash');

const checkAuthAndSetUser = (req, res, next) => {
    const receivedJwt = req.headers['authorization'];

    if (!receivedJwt) {
        next(new UnauthorizedError());
    }

    let decodedJwtCopy;
    try {
        decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
        decodedJwtCopy = _.cloneDeep(decodedJwt); //방어적 복사
    }
    catch (err) {
        if (!err instanceof jwt.TokenExpiredError) {
            next(err);
        }
        
        const newToken = generateNewToken();
        
        res = setCookie(res, 'token', newToken, { //카피온라이트
            httpOnly : true
        });
    }

    req = objectSet(req, 'user', decodedJwtCopy); //카피온라이트

    next();
};

function objectSet(object, key, value) { //객체 유틸 함수
    const copy = Object.assign({}, object);
    copy[key] = value;
    return copy;
}

function setCookie(res, name, payload, options) { //copy-on-write 쿠키 설정
    const copy = Object.assign({}, res);
    return copy.cookie(name, payload, options);
}

module.exports = checkAuthAndSetUser;