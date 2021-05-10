var app = require('../../app')
var functionPost = require('../../Azure functions/FunctionPOST');
var alert = require('alert');


function adminEditUser(req,res){
    var email = req.body.email;
    global.localStorage.setItem('adminEmailChange',email)
    app.admingetEditUser(req,res,email)

}

//Add something so it tells you if the user doesn't exist
function adminDeleteUser(req,res){
    var email = req.body.email

    functionPost.deleteUser(email)
    alert("You successfully deleted the user")
    res.redirect("/Admin");
}

async function adminAmountofMatches(req,res){
    var amountMatches = await Promise.resolve(functionPost.adminAmountMatches());

    app.adminGetAmountMatches(req,res,amountMatches);

    res.redirect("/amountMatches");


}
async function adminAmountofUsers(req,res){
    var amountUsers = await Promise.resolve(functionPost.adminAmountUsers());
    app.adminGetAmountUsers(req,res,amountUsers);
    res.redirect("/amountUsers")
}

module.exports = {
    adminEditUser,
    adminDeleteUser,
    adminAmountofMatches,
    adminAmountofUsers
};