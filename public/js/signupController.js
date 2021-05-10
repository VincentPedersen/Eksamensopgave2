var fs = require('fs');
var alert = require('alert');
var User = require('../../Model/Users');
var functionPost = require('../../Azure functions/FunctionPOST');
const bcrypt = require('bcrypt')
const saltRounds = 10;


//Needs to add something so that you can't use the same email address as someone else
function createNewUser(req,res) {

    var email = req.body.email;
    var password = req.body.password;
    var first_name = req.body.first_name; 
    var last_name = req.body.last_name; 
    var age = req.body.age; 
    var location = req.body.location; 
    var gender = req.body.gender;
    var prefferedSexArray = req.body.prefferedSex;
        var prefferedSex1 = prefferedSexArray[0];
        var prefferedSex2 = prefferedSexArray[1];
        var prefferedSex3 = prefferedSexArray[2];
    var interestsArray = req.body.interests;
        var interests1 = interestsArray[0];
        var interests2 = interestsArray[1];
        var interests3 = interestsArray[2];
        
        function ValidateEmail(email)
        {
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(email.match(mailformat))
            {
            console.log("Valid email address!");
            return true;
            }
            else
            {
            console.log("You have entered an invalid email address!");
            return false;
            }
        }

    var validatedemail = ValidateEmail(email)

    if (validatedemail==false){
        res.redirect("/signUp")
        alert("You have entered an invalid email address")
    } else { 
        if(interestsArray.length!==3){
            res.redirect("/signUp")
            alert("You need to choose 3 interests")
        } else {
        
            //encrypts the password - would maybe make sense to have as a method in the class but couldn't make it work
            var hash = bcrypt.hashSync(password,saltRounds,function(err,hash){
                console.log(hash);
            });
            //It adds a number 4 if you haven't chosen prefferedSex 2 or 3. Number 4 is just an empty gender
            if(typeof prefferedSex2 === 'undefined'){
                var user = new User('',email,hash,first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,4,4)
            } else if(typeof prefferedSex3 === 'undefined'){
                var user = new User('',email,hash,first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,4)
            } else {
                var user = new User('',email,hash,first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3)
            }
            
        
            console.log(user);
        
        functionPost.signUp(user)
        
        res.redirect("/login")
            
        }


   }
return user;
}


module.exports = createNewUser; 