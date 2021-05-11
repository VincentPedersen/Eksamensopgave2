var polyfill = require('localstorage-polyfill');
var functionPost = require('../../Azure functions/FunctionPOST');

//Deletes the user that is currently logged in
function deleteUser(req,res){

    //Gets email from localStorage
    var email = localStorage.getItem('email');

    functionPost.deleteUser(email);

    localStorage.removeItem('email');



res.redirect("/login")

}

module.exports = deleteUser;