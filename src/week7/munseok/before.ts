const allBooks = (req: Request, res: Response) => {
  let allBooksRes = { books: [] as RowDataPacket[], pagination: {} };
  let { limit, currentPage, news, categoryId } = req.query;

  let parsedLimit = parseInt(limit as string, 10);
  let parsedCurrentPage = parseInt(currentPage as string, 10);
  let offset = (parsedCurrentPage - 1) * parsedLimit;
  let parsedCategoryId = parseInt(categoryId as string, 10);

  let sql =
    'SELECT SQL_CALC_FOUND_ROWS *, (SELECT COUNT(*) FROM likes WHERE liked_book_id=books.id) AS likes FROM books';
  let values: number[] = [];

  if (categoryId && news) {
    sql += ' WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
    values = [...values, parsedCategoryId];
  } else if (categoryId) {
    sql += ' WHERE category_id = ?';
    values = [...values, parsedCategoryId];
  } else if (news) {
    sql += ' WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
  }

  sql += ' LIMIT ?, ?';
  values = [...values, offset, parsedLimit];

  conn.query(sql, values, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return handleDatabaseError(err, res);
    }

    if (Array.isArray(results) && results.length) {
      results.map((result: RowDataPacket) => {
        result.pubDate = result.pub_date;
        delete result.pub_date;
      });
      allBooksRes.books = results;
      sql = 'SELECT found_rows()';
      conn.query(sql, (err, results: RowDataPacket[]) => {
        if (err) return handleDatabaseError(err, res);

        let pagination: Pagination = {
          currentPage: parsedCurrentPage,
          totalCount: results[0]['found_rows()'],
        };

        allBooksRes.pagination = pagination;

        return res.status(StatusCodes.OK).json(allBooksRes);
      });
    } else {
      console.log(parsedCategoryId, offset, parsedLimit);
      console.log('SQL Query:', sql);
      console.log('Values:', values);
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};
