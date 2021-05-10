const loginController=require('./loginController')
var polyfill = require('localstorage-polyfill');
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