// 비밀번호를 암호화하는 함수
const hashPassword = (password, salt) => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");
};

// 비밀번호를 비교하는 함수
const comparePasswords = (inputPassword, savedPassword, savedSalt) => {
  const hashedInputPassword = hashPassword(inputPassword, savedSalt);
  return hashedInputPassword === savedPassword;
};

// 비밀번호 리셋 함수
const resetPassword = (req, res) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(10).toString("base64");
  const hashedPassword = hashPassword(password, salt);

  let sql = `SELECT password, salt FROM users WHERE email = ?`;
  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const beforePassword = results[0].password;
    const beforeSalt = results[0].salt;

    if (comparePasswords(password, beforePassword, beforeSalt)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "비밀번호가 이전과 동일합니다. 다른 비밀번호를 입력해주세요.",
      });
    } else {
      let updateSql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
      let values = [hashPassword, salt, email];

      conn.query(updateSql, values, (updateErr, updateResults) => {
        if (updateErr) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (updateResults.affectedRows === 0) {
          return res.status(StatusCodes.BAD_REQUEST).end();
        } else {
          return res.status(StatusCodes.OK).json(updateResults);
        }
      });
    }
  });
};

export default resetPassword;
