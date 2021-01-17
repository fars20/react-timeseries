const express = require('express')
const path = require('path');
const app = express()
const port = 4000

app.use('/',express.static(path.resolve(__dirname)));
app.use('/static',express.static(path.resolve(__dirname,'..','dist')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
