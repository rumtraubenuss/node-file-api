'use strict'

const fs = require('fs')
const path = require('path')

const dirName = 'public/images'
const dirPath = path.join(__dirname, ...dirName.split('/'))

const express = require('express')
const app = express()
const port = process.env.PORT || 8081
const router = express.Router()
const cors = require('cors')

router.get('/', (req, res) => {
  const fileNames = get_file_names()
  res.json({
    total: fileNames.length,
    items: fileNames
  })
})

app.use(cors())
app.use('/api', router)
app.use(express.static('public'))
app.listen(port)

function get_file_names() {
  return fs.readdirSync(dirPath).filter(sanitize_by_extension)
}

function sanitize_by_extension(file_name) {
  const ext = file_name.split('.').slice(-1)[0].toLowerCase()
  return !!['jpg','png','gif'].find(val => val == ext)
}
