const express = require('express');
const app = express(); 
let data = require('./data'); 

app.set('view engine', 'pug'); 
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index', {
        heading : "My portfolio",
        portfolio_description: "In this project, I created a gorgeous portfolio site to showcase the great projects I´ve built.",
        projects : data.projects
    } )
})

app.get('/about', (req,res)=>{
    res.render('about', {
        myName: "Wojciech Marcichow"
    })
})

app.get('/projects/:id', (req,res)=>{
    
    const id =  req.params.id.slice(1) // slicing a colon
    res.render('project', { 
        ProjectName : data.projects[id].projekt_name,
        Description : data.projects[id].description,
        technologies: data.projects[id].technologies,
        live : data.projects[id].live_link,
        gitHub : data.projects[id].github_link,
        imageURL1 : data.projects[id].image_url[1],
        imageURL2 : data.projects[id].image_url[2]
    });
    
});

app.use((req,res, next) => {
    console.log('404 error handler called'); 
    res.status(404).render('page-not-found')
})

app.use((err, req, res, next) => {
    if(err) {
        console.log('Global error handler called', err)
    }
    if(err.status === 404){
        res.status(404).render('page-not-found', {err});
    }else{
        err.message = err.message || `Opps it looks like sth went wrong on the server`;
        res.status(err.status || 500).render('error', { err })
    }
})

app.listen(3000, ()=>{
    console.log("Port 3000 is active now");
});