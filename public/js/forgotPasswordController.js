const { json } = require('body-parser');
var functionPost = require('../../Azure functions/FunctionPOST');
var polyfill = require('localstorage-polyfill');
var alert = require('alert');

//Sends email to user if they have forgot their password
function forgotPassword (req,res) {
    var email = req.body.email;

    functionPost.forgotPassword(email)
    
    //Saves the email adress in local storage so it can be used by newPasswordController
    global.localStorage.setItem('email',email);

    res.redirect("/login")
    alert("An email has been sent to you!")


}

module.exports = forgotPassword;
