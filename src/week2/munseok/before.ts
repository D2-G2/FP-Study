/**
 * 암묵적 입력 : req.body
 * 암묵적 출력 : res.status, res.json, console.log(err)
 */

// controllers/userController.ts
const join = (req: Request, res: Response) => {
  const { email, password } = req.body;

  let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';

  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

  let values = [email, hashPassword, salt];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.CREATED).json(results);
  });
};

// routes/users.ts
router.post(
  '/join',
  [
    body('email').notEmpty().isEmail().withMessage('email 확인 필요'),
    body('password').isString().notEmpty().withMessage('비밀번호 확인 필요'),
    validate,
  ],
  join
);
