const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { connectToDatabase } = require('./configs/dbConfig'); // Adjust the path if needed
const app = express();
const authMiddleware = require('./middlewares/authMiddleware');

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
connectToDatabase()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/auth',require('./controllers/auth'))
app.use('/category', authMiddleware, require('./controllers/category'))
app.use('/car', authMiddleware, require('./controllers/car'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})