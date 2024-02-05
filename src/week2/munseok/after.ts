/**
 * 변경사항
 * 1. 암묵적 입력과 암묵적 출력을 명시적으로 바꿔 req, res 객체의 의존성 분리를 통한 함수 순수성 높이기
 * 2. hashPassword, generateSalt 함수를 순수함수로 분리
 * 3. asyncWrapper를 고차함수로 분리하여 함수를 일급 객체로 처리하기
 * 4. 비동기 처리
 * 5. 에러핸들링 함수 분리하여 일관성 높이기
 */

// controllers/userController.ts
const hashPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
};

const generateSalt = () => crypto.randomBytes(10).toString('base64');

const join = async (email: string, password: string) => {
  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
  let values = [email, hashedPassword, salt];

  const results = await conn.query(sql, values);
  return { status: StatusCodes.CREATED, results };
};

// routes/users.ts
function asyncWrapper(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

router.post('/join', [
  body('email').notEmpty().isEmail().withMessage('email 확인 필요'),
  body('password').isString().notEmpty().withMessage('비밀번호 확인 필요'),
  validate,
  asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const { status, results } = await join(email, password);
    res.status(status).json(results);
  }),
]);

// middlewares/errorHandler.ts
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Internal Server Error',
  });
}

// App.ts
app.use(errorHandler);
