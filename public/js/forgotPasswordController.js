const { json } = require('body-parser');
var functionPost = require('../../Azure functions/FunctionPOST');
var polyfill = require('localstorage-polyfill');

function forgotPassword (req,res) {
    var email = req.body.email;

    functionPost.forgotPassword(email)
    
    //Saves the email adress in local storage so it can be used by newPasswordController
    global.localStorage.setItem('email',email);
    console.log(localStorage.getItem('email'))

}

module.exports = forgotPassword;
