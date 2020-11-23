const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
//app.use(express.static('public'))
//app.use(express.static('public/cite'))



app.get('/', (req, res) => {
  res.send('Hello Ebanga World!')
});

app.get('/coco1', (req, res) => {
  //res.sendFile("/exemple.txt");
  res.sendFile('public/exemple.txt' , { root : __dirname});
});

app.get('/ab?cd', function (req, res) {

  res.sendFile('public/cite/coco.txt' , { root : __dirname});
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

