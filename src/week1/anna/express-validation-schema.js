//not schema
router.post('/', /* 결제 하기 */
        [
			body('items').isArray().withMessage('items need to be array'),
            body('items.*.bookId').isNumeric().withMessage('bookId need to be number'),
            body('items.*.count').isNumeric().withMessage('count need to be number'),
            body('delivery.address').notEmpty().withMessage('No address'),
            body('delivery.receiver').notEmpty().withMessage('No receiver'),
            body('delivery.contact').isMobilePhone('any').withMessage('Contact format error'),
            body('delivery.contact').matches('^\\d{3}-\\d{3,4}-\\d{4}$', 'g').withMessage('Contact format error'),
            body('delivery.totalPrice').isNumeric().withMessage('Price need to be number'),
            util.validate,
            util.verifyToken,
        ]

//schema

const paymentSchema = {
    items: {
        isArray: true,
        errorMessage: 'Items should be array'
    },
    'items.*.bookId': {
        isNumeric: true,
        errorMessage: 'BookId should be number'
    },
    'items.*.count': {
        isNumeric: true,
        errorMessage: 'Count should be number'
    },
    'delivery.address': {
        notEmpty: true,
        errorMessage: 'No Address'
    },
    'delivery.receiver': {
        notEmpty: true,
        errorMessage: 'No receiver'
    },
    'delivery.contact': {
        matches: {
            options: '^\\d{3}-\\d{3,4}-\\d{4}$',
            errorMessage: 'PhoneNumber format unmatch'
        }
    },
    totalPrice: {
        isNumeric: true,
        errorMessage: 'TotalPrice should be number'
    },
}

router.post('/', /* 결제 하기 */
        [
            checkSchema(paymentSchema),
            util.validate,
            util.verifyToken,
        ],
