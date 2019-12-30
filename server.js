const express = require('express');
// require('dotenv').config({ path: '.env' });
const connectDB = require('./db');

connectDB();

const app = express();
app.use(express.json({ extended: false }));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.get('/', (req, res) => {
  res.send('ji');
});

const port = process.env.port || 5000;
app.listen(port, () => console.log('server up'));
