import { clone } from 'lodash';

const bookDetail = (req: Request, res: Response) => {
  // ...

  conn.query(sql, values, (err, results: RowDataPacket[]) => {
    if (err) return handleDatabaseError(err, res);
    if (results[0]) {
      let resultCopy = clone(results[0]);
      resultCopy.categoryId = resultCopy.category_id;
      resultCopy.pubDate = resultCopy.pub_date;
      resultCopy.categoryName = resultCopy.category_name;
      delete resultCopy.category_id;
      delete resultCopy.pub_date;
      delete resultCopy.category_name;
      return res.status(StatusCodes.OK).json(resultCopy);
    } else return res.status(StatusCodes.NOT_FOUND).end();
  });
};
