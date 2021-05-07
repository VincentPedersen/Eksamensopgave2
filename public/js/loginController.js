//var bodyParser = require('body-parser')
var fs = require('fs');
var alert = require('alert');
var functionPost = require('../../Azure functions/FunctionPOST');
var app = require('../../app')
const bcrypt = require('bcrypt');
const { callbackPromise } = require('nodemailer/lib/shared');
const { response } = require('express');
const saltRounds = 10;




//Kind of a async function hell...because both functionPost.login and bcrypt.compare are either async functions or have async functions in them 
//this meant that it was super hard to assign variables to their return values and not just have them return undefined
async function login (req,res){


    var email = req.body.email; 
    var password = req.body.password; 

    //gets the hashedpassword that is stored with that email.
    var hashedpassword = await functionPost.login(email);
    console.log(hashedpassword)
    console.log(password)
    //compares the hashedpassword with the userwritten one
        bcrypt.compare(password,hashedpassword,(err,response)=>{
            console.log('Compared result',response,hashedpassword)
            failOrnot(req,res,response,email)
            return res 
            
        })
    
}

function failOrnot(req,res,response,email){
    console.log(response)
    
    if (response==true){
        app(req,res,email);
    } else {
         res.redirect("/login");
         alert("Wrong username or password!");
    }
    
}

module.exports = login; 




