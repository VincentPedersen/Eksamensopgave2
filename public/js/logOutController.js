var polyfill = require('localstorage-polyfill');

//logs out by removing email from local storage (this makes sure that the stay logged in controller doesnt't work)
function logOut(req,res){

    localStorage.removeItem('email');
    console.log(localStorage.getItem('name'))

    res.redirect("/login")
}
module.exports = logOut;