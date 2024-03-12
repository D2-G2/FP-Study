interface queryCondition {
  query: string;
  values: any[];
}

const categoryCondition = (categoryId: number) =>
  categoryId
    ? {
        query: ' WHERE category_id = ?',
        values: [categoryId],
      }
    : { query: '', values: [] };

const newsCondition = (news: string, categoryId: number) =>
  news
    ? {
        query: categoryId
          ? ' AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()'
          : ' WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()',
        values: [],
      }
    : { query: '', values: [] };

const composeSqlQuery = (baseQuery: string, conditions: queryCondition[]) => {
  return conditions.reduce(
    (acc, condition) => {
      acc.query += condition.query;
      acc.values.push(...condition.values);
      return acc;
    },
    { query: baseQuery, values: [] }
  );
};

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

  let { query: composedSql, values: composedValues } = composeSqlQuery(sql, [
    categoryCondition(parsedCategoryId),
    newsCondition(news as string, parsedCategoryId),
  ]);

  composedSql += ' LIMIT ?, ?';
  composedValues = [...composedValues, offset, parsedLimit];

  conn.query(composedSql, composedValues, (err, results: RowDataPacket[]) => {
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
