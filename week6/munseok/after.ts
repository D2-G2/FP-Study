import conn from '../db/mariadb';
import StatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

dotenv.config();

const encryptPassword = (password: string, salt?: string) => {
  if (!salt) {
    salt = crypto.randomBytes(10).toString('base64');
  }
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
  return { hashPassword, salt };
};

const executeQuery = (sql: string, values: any[]) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const withErrorHandling = (fn: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  };
};

const join = withErrorHandling(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { hashPassword, salt } = encryptPassword(password);

  let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';

  await executeQuery(sql, [email, hashPassword, salt]);
  res.status(StatusCodes.CREATED).end();
});

const login = withErrorHandling(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let sql = 'SELECT * FROM users WHERE email = ?';

  const results: any = await executeQuery(sql, [email]);
  const loginUser = results[0];

  const { hashPassword } = encryptPassword(password, loginUser.salt);

  if (loginUser && loginUser.password === hashPassword) {
    const token = jwt.sign(
      {
        id: loginUser.id,
        email: loginUser.email,
      },
      process.env.PRIVATE_KEY as string,
      {
        expiresIn: '5m',
        issuer: 'munseok',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
    });

    console.log(token);

    res.status(StatusCodes.OK).json({ ...loginUser, token: token });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

const passwordResetRequest = withErrorHandling(async (req: Request, res: Response) => {
  const { email } = req.body;

  let sql = 'SELECT * FROM users WHERE email = ?';

  const results: any = await executeQuery(sql, [email]);

  if (results.length === 0) {
    res.status(StatusCodes.NOT_FOUND).end();
    return;
  }

  res.status(StatusCodes.OK).end();
});

const passwordReset = withErrorHandling(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { hashPassword, salt } = encryptPassword(password);

  let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
  const results: any = await executeQuery(sql, [hashPassword, salt, email]);

  if (results.affectedRows === 0) {
    res.status(StatusCodes.NOT_FOUND).end();
    return;
  }
  res.status(StatusCodes.OK).json(results);
});

export { join, login, passwordResetRequest, passwordReset };
