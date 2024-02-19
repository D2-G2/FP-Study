const bookDetail = (req: Request, res: Response) => {
  // ...

  conn.query(sql, values, (err, results: RowDataPacket[]) => {
    if (err) return handleDatabaseError(err, res);
    if (results[0]) {
      results[0].categoryId = results[0].category_id;
      results[0].pubDate = results[0].pub_date;
      results[0].categoryName = results[0].category_name;
      delete results[0].category_id;
      delete results[0].pub_date;
      delete results[0].category_name;
      return res.status(StatusCodes.OK).json(results[0]);
    } else return res.status(StatusCodes.NOT_FOUND).end();
  });
};
