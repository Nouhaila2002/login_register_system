const { json } = require('body-parser');
const Credential = require('../models/Credential');

/*Credential.find({email:'nouhaila@gmail.com'},(err,result)=>{
    
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }

});*/


const getAllContacts = (req, res) => {

    Credential.find((err,contacts) => {
   

    contacts.forEach(contact =>{
       if(contact.email === req.body.email && contact.password===req.body.password ){

       req.session.user = req.body.email; //will create a session variable with your email 
        res.redirect('/route/dashboard');
       }else{
        res.end("Invalid Username");
    }
    })

    if(err || !contacts){
    
      return res.json({error : "No data"})
    
     }
    //res.json({contacts});
    });
    
};
    

const addContact = (req, res) => {

    const email = "sara2@gmail.com";
    
    const password = "sara2";
    
    const newContact = new Credential({email,password});
    
    newContact.save()
    .then(() => res.json(newContact))
    .catch(err => console.log(err));
    
};
    
module.exports = {addContact,getAllContacts}
    
    
    


