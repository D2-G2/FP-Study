// 고객에게 메뉴 표시
app.get('/menu', (req: Request, res: Response) => {
  connection.query('SELECT * FROM Menu', (error: mysql.MysqlError, results: Menu[]) => {
    if (error) throw error;
    res.send(results);
  });
});

// 고객의 로그인 정보를 받고 검증
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  connection.query(
    'SELECT * FROM Customer WHERE username = ? AND password = ?',
    [username, password],
    (error: mysql.MysqlError, results: Customer[]) => {
      if (error) throw error;
      if (results.length > 0) {
        res.send({ status: 'success', message: 'Login successful' });
      } else {
        res.send({ status: 'fail', message: 'Login failed' });
      }
    }
  );
});

// 주문 정보 검증 및 처리
app.post('/order', (req: Request, res: Response) => {
  const order: Order = req.body;
  // 주문 검증 로직 (예: 주문 가능 여부 확인, 금액 계산 등)
  // ...

  // 주문 정보를 데이터베이스에 저장
  connection.query('INSERT INTO Orders SET ?', order, (error: mysql.MysqlError, results: any) => {
    if (error) throw error;
    res.send({ status: 'success', message: 'Order placed successfully', orderId: results.insertId });
  });
});

// 주방에 주문 내역 전달
app.post('/order/:orderId/sendToKitchen', (req: Request, res: Response) => {
  const { orderId } = req.params;
  connection.query(
    'UPDATE Orders SET status = "cooking" WHERE orderId = ?',
    [orderId],
    (error: mysql.MysqlError, results: any) => {
      if (error) throw error;
      res.send({ status: 'success', message: 'Order sent to kitchen successfully' });
    }
  );
});

// 배달 상태 업데이트
app.post('/order/:orderId/updateDeliveryStatus', (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body; // 예: "delivering" 또는 "delivered"
  connection.query(
    'UPDATE Orders SET deliveryStatus = ? WHERE orderId = ?',
    [status, orderId],
    (error: mysql.MysqlError, results: any) => {
      if (error) throw error;
      res.send({ status: 'success', message: 'Delivery status updated successfully' });
    }
  );
});
