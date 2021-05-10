var fs = require('fs');
// Have to require the loginController, to find out which user is currently signed in, so you know which user to delete (through the displayname variable)
const loginController = require('./loginController');
var polyfill = require('localstorage-polyfill');
var functionPost = require('../../Azure functions/FunctionPOST');

function deleteUser(req,res){

    //Gets email from localStorage
    var email = localStorage.getItem('email');
    console.log(email)

    functionPost.deleteUser(email);

    localStorage.removeItem('email');



res.redirect("/login")

}

module.exports = deleteUser;