var fs = require('fs');
var alert = require('alert');
// Have to require the loginController, to find out which user is currently signed in, so you know which user to delete (through the displayname variable)
const loginController = require('./loginController');
var app = require('../../app')
var functionPost = require('../../Azure functions/FunctionPOST');
const User = require('../../Model/Users');
const renderUserProfile = require('./renderUserProfileController');
const { isNull } = require('util');


//after having edited user, it changes what user info is displayed on the homepage
//add something so you can't change your info to something that already exists

async function updateUser(req,res){

    //First have to get the current user data
    if (localStorage.getItem('email')==='Admin'){
        var email = localStorage.getItem('adminEmailChange');
    } else {
        var email = localStorage.getItem('email');
    }
    var result = await renderUserProfile.renderUserProfile(email);

console.log(result)
    var id = result[0]
    var email = result[1]
    var first_name = result[2];
    var last_name = result[3];
    var age = result[4];
    var location = result[5];
    var gender = result[6];
    var interests1 = result[7];
    var interests2 = result[8];
    var interests3 = result[9];
    var prefferedSex1 = result[10];
    var prefferedSex2 = result[11];
    var prefferedSex3 = result[12];

    //Making sure I get prefferedSex as INT and not as text
        if(prefferedSex1==='Male'){
                prefferedSex1 = 1;
            } else if(prefferedSex1==='Female'){
                 prefferedSex1 = 2;
            } else if (prefferedSex1==='Other'){
                prefferedSex1 = 3;
            } else if (prefferedSex1 == null){
                prefferedSex1 = 4
            }

        if(prefferedSex2==='Male'){
                prefferedSex2 = 1;
            } else if(prefferedSex2==='Female'){
                prefferedSex2 = 2;
            } else if (prefferedSex2==='Other'){
                prefferedSex2 = 3;
            } else if (prefferedSex2 == null){
                prefferedSex2 = 4
            }

        if(prefferedSex3==='Male'){
                prefferedSex3 = 1;
            } else if(prefferedSex3==='Female'){
                prefferedSex3 = 2;
            } else if (prefferedSex3==='Other'){
                prefferedSex3 = 3;
            } else if (prefferedSex3 == null){
                prefferedSex3 = 4
        }
    //Very ugly solution underneath...this should have been solved by using another Azure function
        if(interests1 ==='Sport'){
            interests1 = 1;
        } else if (interests1 ==='Cooking'){
            interests1 =2;
        }else if (interests1 ==='Travelling'){
            interests1 =3;
        }else if (interests1 ==='Movies'){
            interests1 =4;
        } else if (interests1 ==='Books'){
            interests1 =5;
        } else if (interests1 ==='Art'){
            interests1 =6;
        }else if (interests1 ==='Partying'){
            interests1 =7;
        } else if (interests1 ==='Music'){
            interests1 =8;
        } else if (interests1 ==='Fashion'){
            interests1 =9;
        }

        if(interests2 ==='Sport'){
            interests2 = 1;
        } else if (interests2 ==='Cooking'){
            interests2 =2;
        }else if (interests2 ==='Travelling'){
            interests2 =3;
        }else if (interests2 ==='Movies'){
            interests2 =4;
        } else if (interests2 ==='Books'){
            interests2 =5;
        } else if (interests2 ==='Art'){
            interests2 =6;
        }else if (interests2 ==='Partying'){
            interests2 =7;
        } else if (interests2 ==='Music'){
            interests2 =8;
        } else if (interests2 ==='Fashion'){
            interests2 =9;
        }

        if(interests3 ==='Sport'){
            interests3 = 1;
        } else if (interests3 ==='Cooking'){
            interests3 =2;
        }else if (interests3 ==='Travelling'){
            interests3 =3;
        }else if (interests3 ==='Movies'){
            interests3 =4;
        } else if (interests3 ==='Books'){
            interests3 =5;
        } else if (interests3 ==='Art'){
            interests3 =6;
        }else if (interests3 ==='Partying'){
            interests3 =7;
        } else if (interests3 ==='Music'){
            interests3 =8;
        } else if (interests3 ==='Fashion'){
            interests3 =9;
        }

        var oldUser = new User(id,email,'',first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3);
    
    
    var newEmail = req.body.newEmail; 

    //Validates email so you can't change it to something that you wouldn't be able to sign up with
    function ValidateEmail(newEmail)
        {
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(newEmail.match(mailformat))
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

    var validatedemail = ValidateEmail(newEmail)

    if (validatedemail==false){
        if(newEmail!==""){
            alert("You have entered an invalid email address")
        }
        newEmail = email;
    }
    var newfirstName = req.body.newFirst_name;
    var newlastName = req.body.newLast_name; 
    var newAge = req.body.newAge;
    var newLocation = req.body.newLocation;
    var newGender = req.body.newGender;
    var interestsArray = req.body.interests;
    if (typeof interestsArray !== 'undefined'){
        var newinterests1 = interestsArray[0];
        var newinterests2 = interestsArray[1];
        var newinterests3 = interestsArray[2];
    } else {
        var newinterests1 = interests1;
        var newinterests2 = interests2;
        var newinterests3 = interests3;
    }
    
    var prefferedSexArray = req.body.prefferedSex;
    if(typeof prefferedSexArray !=='undefined'){
        var newprefferedSex1 = prefferedSexArray[0];
        var newprefferedSex2 = prefferedSexArray[1];
        var newprefferedSex3 = prefferedSexArray[2];
    } else {
        var newprefferedSex1 = prefferedSex1;
        var newprefferedSex2 = prefferedSex2;
        var newprefferedSex3 = prefferedSex3;
    }
        

    if(typeof newprefferedSex2 === 'undefined'){
        //Not the best solution, but instead of deleting a row if a user goes from having 3 or 2 prefferedSexes to only having 2 or 1, the prefferedSex gets set to 4, which is just a gender with the value null
        newprefferedSex2 = 4;
        newprefferedSex3 = 4;
    var newUser = new User('',newEmail,'',newfirstName,newlastName,newAge,newLocation,newGender,newinterests1,newinterests2,newinterests3,newprefferedSex1,newprefferedSex2,newprefferedSex3);
    } else if(typeof newprefferedSex3 === 'undefined'){
        newprefferedSex3 = 4;
    var newUser = new User('',newEmail,'',newfirstName,newlastName,newAge,newLocation,newGender,newinterests1,newinterests2,newinterests3,newprefferedSex1,newprefferedSex2,newprefferedSex3);
    } else {
    var newUser = new User('',newEmail,'',newfirstName,newlastName,newAge,newLocation,newGender,newinterests1,newinterests2,newinterests3,newprefferedSex1,newprefferedSex2,newprefferedSex3);
    }

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

   
    console.log(newUser)
    functionPost.editUser(newUser,email);
    
    if (localStorage.getItem('email')==='Admin'){
        res.redirect("/Admin")
        alert("You have successfully edited a user!")
    } else {
        res.redirect("/savedChanges")
        global.localStorage.setItem('email',newUser.email);
    }

    
        
    return newUser

}



module.exports = updateUser;