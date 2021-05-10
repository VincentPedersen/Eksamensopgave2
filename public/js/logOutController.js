
const loginController = require('./loginController');
var polyfill = require('localstorage-polyfill');
function logOut(req,res){

    localStorage.removeItem('email');
    console.log(localStorage.getItem('name'))

    res.redirect("/login")
}
module.exports = logOut;