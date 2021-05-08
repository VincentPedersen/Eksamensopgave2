var fs = require('fs');
var alert = require('alert');
// Have to require the loginController, to find out which user is currently signed in, so you know which user to delete (through the displayname variable)
const loginController = require('./loginController');
var app = require('../../app')
var functionPost = require('../../Azure functions/FunctionPOST');
const User = require('../../Model/Users');


//after having edited user, it changes what user info is displayed on the homepage
//add something so you can't change your info to something that already exists
function editUser (req,res){

    var email = localStorage.getItem('email')
    app.getEditUser(req,res,email);
    
}

async function updateUser(req,res){

    //First have to get the current user data
    var email = localStorage.getItem('email');
    var oldUser = await functionPost.renderUserProfile(email);

    var email = oldUser[0]
    var first_name = oldUser[1];
    var last_name = oldUser[2];
    var age = oldUser[3];
    var location = oldUser[4];
    var gender = oldUser[5];

    var oldUser = new User(email,'',first_name,last_name,age,location,gender);
    
    var newEmail = req.body.newEmail; 
    var newfirstName = req.body.newFirst_name;
    var newlastName = req.body.newLast_name; 
    var newAge = req.body.newAge;
    var newLocation = req.body.newLocation;
    var newGender = req.body.newGender;

    var newUser = new User(newEmail,'',newfirstName,newlastName,newAge,newLocation,newGender);


    if(newUser.email===""){
        newUser.email = oldUser.email;
    } 
    if (newUser.first_name===""){
        newUser.first_name = oldUser.first_name;
    }
    if (newUser.last_name===""){
        newUser.last_name = oldUser.last_name;
    }
    if (newUser.age===""){
        newUser.age = oldUser.age;
    }
    if (newUser.location===""){
        newUser.location = oldUser.location;
    }
    if (typeof newUser.gender === 'undefined'){
        if(oldUser.gender==='Male'){
            newUser.gender = 1;
        } else if (oldUser.gender==='Female'){
            newUser.gender = 2;
        } else if (oldUser.gender==='Other'){
            newUser.gender = 3;
        }
    }

   

    functionPost.editUser(newUser,email);

    global.localStorage.setItem('email',newUser.email);
        
    
   res.redirect("/savedChanges")

    
    
    
   

    return newUser

}



module.exports = {
    editUser,
    updateUser
}