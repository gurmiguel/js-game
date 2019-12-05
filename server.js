const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})
app.use(express.static(path.resolve(__dirname, 'dist')))

app.listen(port, () => console.log(`Server listening on port ${port}`))