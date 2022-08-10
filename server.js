const express = require('express');
const path =require('path');
const app = express(); // express app
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const Credential = require('./public/models//Credential');









const router = require('./router');

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


// initialize the engine
app.set('view engine','ejs');

// load static assets inside this project
app.use('/static',express.static(path.join(__dirname,'public')));

// inform http server that i'm going to use this jpg file inside this project
app.use('/assets',express.static(path.join(__dirname,'public/assets')));


app.use(session({
    secret:uuidv4(), // 'secret' = 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router); // this middleware will add all this routers (exist in router.js) inside the server 

// home route 
app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"});
    //res.render('register')
})

// start the server 
app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000")});