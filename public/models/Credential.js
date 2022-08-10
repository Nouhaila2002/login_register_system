const mongoose = require('mongoose');

const url = "mongodb+srv://nouhaila:nouhaila@cluster0.l29wg.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url)
.then(()=>console.log("connected"))
.catch(err => console.log(err));


const Credential = mongoose.Schema({email:{type:String} , password:{type:String}});



module.exports = mongoose.model('Credential',Credential);
