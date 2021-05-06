var functionPost = require('../../Azure functions/FunctionPOST');
var forgotpasswordController = require('./forgotPasswordController');
var polyfill = require('localstorage-polyfill');
const bcrypt = require('bcrypt')
const saltRounds = 10;

function newPassword (req,res) {
    var password = req.body.password;
    //Gets email from localStorage
    var email = localStorage.getItem('email')
    console.log(email)

    var hash = bcrypt.hashSync(password,saltRounds,function(err,hash){
        console.log(hash);
    });

    functionPost.newPassword(email,hash)

    res.redirect("/login")

}


module.exports = newPassword;
    
