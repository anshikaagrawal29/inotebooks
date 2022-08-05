const connectToMongo = require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 3000

//this line will allow us to send body in request
app.use(express.json())
//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hey there!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)})