require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const exerciseRouter = require('./Routes/exerciseRoutes')
const userRouter = require('./Routes/userRoutes')

// Mongoose setup
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => { console.log("We did a connect")});


app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/users', exerciseRouter)
app.use('/api/users', userRouter)


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
