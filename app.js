const express = require('express')
const app = express()
const port = process.env.PORT || 3000;


let rootObj = { root : __dirname};

app.get('/', (req, res) => {
 // res.send('Hello Ebanga World!');
  res.sendFile('public/index.html' , rootObj );
});

app.get('/dynipage', (req, res) => {
  // res.send('Hello Ebanga World!');
  res.sendFile('public/dynipage.html' , rootObj );
});


app.get('/coco1', (req, res) => {
  //res.sendFile("/exemple.txt");
  res.sendFile('public/exemple.txt' , rootObj );
});

app.get('/ab?cd', function (req, res) {

  res.sendFile('public/cite/coco.txt' , { root : __dirname});
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

