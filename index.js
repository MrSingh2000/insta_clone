const express = require('express')
const app = express()
const port = 5000
const connectToMongo = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser');

// app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

app.use(cors());
connectToMongo();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/followers'));


app.listen(port, () => {
  console.log(`Instagram app listening on port ${port}`)
})