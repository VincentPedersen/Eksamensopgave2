var fs = require('fs');
var alert = require('alert');
var User = require('../../Model/Users');
var functionPost = require('../../Azure functions/FunctionPOST');
const bcrypt = require('bcrypt')
const saltRounds = 10;



function createNewUser(req,res) {

    var email = req.body.email;
    var password = req.body.password;
    var first_name = req.body.first_name; 
    var last_name = req.body.last_name; 
    var age = req.body.age; 
    var location = req.body.location; 
    var gender = req.body.gender;

    //encrypts the password - would maybe make sense to have as a method in the class but couldn't make it work
    var hash = bcrypt.hashSync(password,saltRounds,function(err,hash){
        console.log(hash);
    });

    

    var user = new User(email,hash,first_name,last_name,age,location,gender)
    console.log(user);

functionPost.signUp(user)

res.redirect("/login")
return user;
}


module.exports = createNewUser; 