const passwordReset = (req, res) => {
  const { email, password } = req.body;

  // 새 비밀번호를 암호화
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");

  // 이전 비밀번호 가져오기
  let sql = `SELECT password, salt FROM users WHERE email = ?`;

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const beforePassword = results[0].password;
    const beforeSalt = results[0].salt;

    const hashedInputPassword = crypto
      .pbkdf2Sync(password, beforeSalt, 10000, 10, "sha512")
      .toString("base64");

    if (beforePassword === hashedInputPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "비밀번호가 이전과 동일합니다. 다른 비밀번호를 입력해주세요.",
      });
    } else {
      // 새 비밀번호로 업데이트
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