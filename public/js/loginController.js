var alert = require('alert');
var functionPost = require('../../Azure functions/FunctionPOST');
var app = require('../../app')
const bcrypt = require('bcrypt');
const { callbackPromise } = require('nodemailer/lib/shared');
const { response } = require('express');
var polyfill = require('localstorage-polyfill');




//Kind of a async function hell...because both functionPost.login and bcrypt.compare are either async functions or have async functions in them 
//this meant that it was super hard to assign variables to their return values and not just have them return undefined
async function login (req,res){


    var email = req.body.email; 
    var password = req.body.password; 
    
    
    //Saves the email adress in local storage so it can be used by deleteUserController
    global.localStorage.setItem('email',email);

    //gets the hashedpassword that is stored with that email.
    var hashedpassword = await functionPost.login(email);
    //compares the hashedpassword with the userwritten one
        bcrypt.compare(password,hashedpassword,(err,response)=>{
            failOrnot(req,res,response,email)
            return res 
            
        })
    
}

function failOrnot(req,res,response,email){
    
    
    if (response==true){
        //Makes sure that if the admin logges in, that they get sent to the admin homepage
        if(email==='Admin'){
            res.redirect("/Admin");
        } else{
            app.getVariables(req,res);
        }
        
    } else {
         res.redirect("/login");
         alert("Wrong username or password!");
    }
    
}

module.exports = login; 




