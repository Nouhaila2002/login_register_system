var express = require('express'); // to use the Route method to create routr inside this file
var router = express.Router()
const {addContact, getAllContacts}=require("./public/Controllers/Credential");
const Credential = require('./public/models/Credential');

const credential = {
    email : "admin@gmail.com",
    password : "admin123"
}

// login user
/*router.post('/login',(req,res)=>{
    if(req.body.email===credential.email && req.body.password === credential.password){ // email : variable ??
        req.session.user = req.body.email; //will create a session variable with your email 
        res.redirect('/route/dashboard');
        //res.end("Login");

    }else{
        res.end("Invalid Username");
    }
});*/

router.post('/login',(req,res)=>{
    Credential.find((err,contacts) => {
       /* if(err || !contacts){
        
            //return res.json({error : "No data"})
          
        }*/

        contacts.forEach(contact =>{
           if(contact.email === req.body.email && contact.password===req.body.password ){
            req.session.user = req.body.email; //will create a session variable with your email 

            res.redirect('/route/dashboard');


           }else{
            //res.end("Invalid Username");
           }
        })  
        //res.json({contacts});
        });
});

router.post('/signup',(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    const newContact = new Credential({email,password});
    
    newContact.save()
    .then(() => res.render('dashboard'))
    .catch(err => console.log(err));

});



// route for dashboard
router.get("/dashboard",(req,res)=>{
    if(req.session.user){ //if the session created and the user value exist 
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render("Unauthorize User")
    }
})

// route for logout
router.get("/logout",(req,res)=>{ //get request 
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{title:"Express",logout:"logout Successfully...!"})
        }
    })

})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get("/contacts",getAllContacts);


module.exports = router;