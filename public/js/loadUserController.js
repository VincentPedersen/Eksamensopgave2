var fs = require('fs');
let alert = require('alert');
var functionPost = require('../../Azure functions/FunctionPOST');
const User = require('../../Model/Users');
var polyfill = require('localstorage-polyfill');
var app = require('../../app')




//loads the potential new matches (the people you haven't liked or disliked yet)
async function loadUser (req,res,minAge,maxAge){
    
    var email = localStorage.getItem('email');
    console.log(email)
    var result = await functionPost.loadUsers(email,minAge,maxAge)
    console.log(result)

    var uniqueResult = [...new Set(result)]
    console.log(uniqueResult)

    //Makes sure that if for some reason your last- and firstname are the same, that your last name doesn't get deleted
    if(result[1]===result[2]){
        var last_name = result[2]
        uniqueResult.splice(2,0,last_name);
    }
    
        

    console.log(uniqueResult)
    return uniqueResult
}
async function assignValues (req,res,minAge,maxAge){
    var result = await loadUser(req,res,minAge,maxAge)
    var id = result[0];
    var first_name = result[1];
    var last_name = result[2];
    var age = result[3];
    var location = result[4];
    var gender = result[5];
    var interests1 = result[6];
    var interests2 = result[7];
    var interests3 = result[8];

    
        var user = new User(id,'','',first_name,last_name,age,location,gender,interests1,interests2,interests3,'','','')
    
    return user

}

async function redirect(req,res,minAge,maxAge){
    var user = await assignValues(req,res,minAge,maxAge);
    global.localStorage.setItem('user2_id',user.id);
    
   // console.log(user)
    
            if(typeof user.id ==='undefined'){
                app.getVariables(req,res)
                alert("There are no more users to like!");
            } else{
                res.redirect("/like");
            }
    return user
}


module.exports = redirect; 