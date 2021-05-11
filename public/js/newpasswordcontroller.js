var functionPost = require('../../Azure functions/FunctionPOST');
var polyfill = require('localstorage-polyfill');
const bcrypt = require('bcrypt')
const saltRounds = 10;

//Updates the new password
function newPassword (req,res) {
    var password = req.body.password;
    //Gets email from localStorage
    var email = localStorage.getItem('email')

    var hash = bcrypt.hashSync(password,saltRounds,function(err,hash){
    });

    functionPost.newPassword(email,hash)

    res.redirect("/login")

}


module.exports = newPassword;
    
