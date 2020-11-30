const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs')

let rootObj = { root : __dirname};


let projectsInfo = {
    lib:  {
        ebika : { name: "EBIKA" }
    },
    borders : {
        description : "BORDURES DE POLYGONES"
    },
    allProjects : [
        {
            id    : "borders",
            description : 'GÉNÉRATEUR DES BORDURES DE POLYGONES',
            des: "ele menys , cecec"
        } ,
        {
            id    : "polesportions",
            description : "VECMENTATION - SEGMENTATION VECTORIELLES ",
            des: "ele menys , cecec"
        } ,
        {
            id    : "segmentation",
            description : "SEGMENTATION GÉOMÉTRIQUES",
            des: "ele menys , cecec"
        } ,
   ]
};

app.get('/', (req, res) => {
    res.render('index',
        {  mainLib: projectsInfo.lib.ebika.name, allprojects: projectsInfo.allProjects});
});

app.get('/ebika', (req, res) => {
  res.sendFile('./public/lib/javascripts/ebika.js' , rootObj );
});

app.get('/ebikaprj', (req, res) => {
  res.sendFile('./public/lib/javascripts/ebika_prj.js' , rootObj );
});

app.get('/profile/:name', (req, res) => {

  res.render('profile',{ description:projectsInfo[ req.params.name].description,
                       name : req.params.name,
                       mainlib :  projectsInfo.lib.ebika.name
  });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

