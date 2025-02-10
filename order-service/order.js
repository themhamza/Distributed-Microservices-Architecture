const express = require('express');
const { queryShard } = require('./sharding'); 

const app = express();
app.use(express.json());


app.post('/order', async (req, res) => {
  const { userId, product, quantity } = req.body;

  try {
    const sql = 'INSERT INTO orders (user_id, product, quantity) VALUES (?, ?, ?)';
    const params = [userId, product, quantity];
    await queryShard(userId, sql, params); 
    res.json({ message: 'Order created successfully' });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});


app.get('/orders/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const sql = 'SELECT * FROM orders WHERE user_id = ?';
    const params = [userId];
    const orders = await queryShard(userId, sql, params); 
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

app.listen(3001, () => {
  console.log('Order service running on port 3001');
});

app.post('/order', async (req, res) => {
    try {
      await queryShard(/* ... */);
    } catch (err) {
      if (err instanceof DatabaseError) {
        
        setTimeout(() => queryShard(/* ... */), 1000);
      }
    }
  });

  app.post('/order', async (req, res) => {
    const { userId, product, quantity } = req.body;
    const sql = 'INSERT INTO orders (user_id, product, quantity) VALUES (?, ?, ?)';
    const params = [userId, product, quantity];
    await queryShard(userId, sql, params);
    res.json({ message: 'Order created successfully' });
  });