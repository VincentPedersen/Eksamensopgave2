var polyfill = require('localstorage-polyfill');
//Checks if email exists in local storage and if it does it will redirect to homepage.
//this is because that when you log in email gets set in local storage and when you log out it gets removed
function stayLoggedin(req,res){
try {
    if(localStorage.getItem('email') !== null){
        res.redirect("/homepage");
    
    }else {
        res.redirect("/login");
    }
    } catch (err){
    console.log(err)
}


}
module.exports = stayLoggedin