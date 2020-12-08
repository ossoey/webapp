const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const  infos = require("./infos");
app.set('view engine', 'ejs')

let rootObj = { root : __dirname};
let projectsInfo  =  infos.getInfos();

app.get('/', (req, res) => {
    res.render('index',
        {  mainLib: projectsInfo.lib.ebika.name,
            labName : projectsInfo.lib.ebika.labName,
            allprojects: projectsInfo.allProjects});
});

app.get('/ebika', (req, res) => {
  res.sendFile('./public/lib/javascripts/ebika.js' , rootObj );
});

app.get('/ebikaprj', (req, res) => {
  res.sendFile('./public/lib/javascripts/ebika_prj.js' , rootObj );
});

app.get('/image/:name', (req, res) => {
    res.sendFile('./public/'+   req.params.name   +'/images/'  +   req.params.name +".png", rootObj );
});

app.get('/project/:name', (req, res) => {
    let projectInfo = projectsInfo.locateProject( req.params.name);
    if (projectInfo)  {
        res.render('project',{ description:projectInfo.description,
            name : projectInfo.id,
            mainlib :  projectsInfo.lib.ebika.name,
            jssource : '/js/'+projectInfo.id
        });
    } else {
        res.render('error',{ typeofError:"ERREUR 404"});

    }
});

app.get('/js/:name', (req, res) => {
    res.sendFile('./public/'+ req.params.name +'/javascripts/'+ req.params.name + ".js", rootObj );
});

app.use((req,res,next) =>{
    res.status(404);
    res.render('error',{ typeofError:"ERREUR 404", mainlib :  projectsInfo.lib.ebika.name});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

