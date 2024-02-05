//변경 전
router.get('/',
    [
        util.verifyToken,
    ],
    async (req, res) => {
        let { userId } = req.user;
        logger.reportRequest(req.url, req.method);
        try {
            let result = {};
            result.data = await order.getOrderList(userId);
            result.message = 'Success';
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            res.stats(500).json(e);
        }
    })

//변경 후 - result 객체 만드는 부분을 함수로 뺌,,
function makeResult(data, error, message) {
    let result = {};
    if (data)
        result.data = data;
    if (error)
        result.error = error;
    if (message)
        result.message = message;
    return result;
}

router.get('/',
    [
        util.verifyToken,
    ],
    async (req, res) => {
        let { userId } = req.user;
        logger.reportRequest(req.url, req.method);
        try {
            let data = await order.getOrderList(userId);
            let result = makeResult(data, null, "Success");
            logger.reportResponse(req.url, req.method, result);
            res.status(200).json(result);
        } catch (e) {
            logger.reportReponseErr(req.url, req.method, e);
            let result = makeResult(null, error, "Error")
            res.status(200).json(result);
        }
    })


module.exports = router;