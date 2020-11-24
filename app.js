const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs')

let rootObj = { root : __dirname};

app.get('/', (req, res) => {
  res.sendFile('public/index.html' , rootObj );
});

app.get('/dynipage', (req, res) => {
  res.sendFile('public/dynipage.html' , rootObj );
});

// app.get('/profile/:name', (req, res) => {
//   // res.send('Hello Ebanga World!');
//
//   res.sendFile('public/dynipage.html' , rootObj );
// });

app.get('/profile/:name', (req, res) => {
  res.render('profile',{person:req.params.name});
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

