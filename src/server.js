const express = require('express')
const app = express()
const cors = require('cors')
const { PORT } = require('./config')
const router = require('./routes/routes')
const fileupload = require('express-fileupload')

app.use(cors())
app.use(fileupload())
app.use(express.json())
app.use(router)
app.use('/*', (_, res) => res.sendStatus(404))

app.listen(PORT, () => {
    console.log(PORT)
})