const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const {UnauthorizedError} = require('../middleware/errorHandler');

const checkAuthAndSetUser = (req, res, next) => {
    const receivedJwt = req.headers['authorization'];

    if (!receivedJwt) {
        next(new UnauthorizedError());
    }

    let decodedJwt;
    try {
        decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    }
    catch (err) {
        if (!err instanceof jwt.TokenExpiredError) {
            next(err);
        }
        
        const newToken = generateNewToken();

        res.cookie('token', newToken, {
            httpOnly : true
        });
    }

    req.user = {
        id: decodedJwt.id,
        email: decodedJwt.email
    }

    next();
};

module.exports = checkAuthAndSetUser;

/**
 * line.14 라인의 외부 라이브러리(jsonwebtoken)을 사용해 가져온 데이터를 방어적 복사
 * line.23 cookie값 세팅을 copy-on-write로 변경
 * line.28 req 객체의 속성추가를 copy-on-write로 변경
 */