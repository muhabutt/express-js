import express from 'express'
import path from 'path'
import routes from './src/routes'
const app = express()
const port = process.env.PORT || 3000

// public index.html route
app.get('/', function (req, res) {
  res.sendFile(path.resolve('public/index.html'))
})

// serving public files
app.use(express.static('public'))

// api routes
app.use('/api/v1', routes)

app.listen(port)
