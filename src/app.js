const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const authRouter = require('./routes/auth.routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

initModels()

db.authenticate()
  .then(() => console.log(`database authenticated`))
  .catch((error) => console.log(error))

db.sync({ force: false })
  .then(() => console.log('db synched'))
  .catch((error) => console.log(error))

app.get('/', (req, res) => {
  res.json({ message: 'welcome to the server' })
})

app.use('/api/v1/auth', authRouter)

module.exports = app
