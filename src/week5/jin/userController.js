const conn = require("../../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { encryptPassword } = require("../utils/encryption");
const { encryptPasswordWithSalt } = require("../utils/encryption");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;

  const newSalt = crypto.randomBytes(16).toString("base64");
  const { hashedPassword, salt } = encryptPassword(password, newSalt);

  let sql = `INSERT INTO users(email, password, salt) VALUES(?, ?, ?)`;

  console.log(hashedPassword);

  let values = [email, hashedPassword, salt];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.affectedRows) {
      res.status(StatusCodes.CREATED).json(results);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  let sql = "SELECT * FROM users WHERE email = ?";

  conn.query(sql, email, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
      });
    }

    if (!results || results.length === 0) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid credentials",
      });
    }

    const loginUser = results[0];
    const { hashedPassword } = encryptPassword(password, loginUser.salt);

    console.log(loginUser.password, hashedPassword);

    if (loginUser && loginUser.password === hashedPassword) {
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "100m",
          issuer: "yoojin",
        }
      );

      console.log(token);

      res.cookie("token", token, {
        httpOnly: true,
      });

      return res.status(StatusCodes.OK).json({ ...results[0], token: token });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid credentials",
      });
    }
  });
};
