var fs = require('fs');
let alert = require('alert');
var functionPost = require('../../Azure functions/FunctionPOST');
const User = require('../../Model/Users');
var polyfill = require('localstorage-polyfill');
var app = require('../../app')




//loads the potential new matches (the people you haven't liked or disliked yet)
async function loadUser (){
    
    var email = localStorage.getItem('email');
    console.log(email)
    var result = await functionPost.loadUsers(email)
    console.log(result)

    var uniqueResult = [...new Set(result)]
    console.log(uniqueResult)

    //Makes sure that if for some reason your last- and firstname are the same, that your last name doesn't get deleted
    if(result[1]===result[2]){
        var last_name = result[2]
        uniqueResult.splice(2,0,last_name);
    }
    
    //Makes sure that if you have only chosen one prefferedSex, that it doesn't delete the two nulls
    if(result[6]===result[14]){
        var prefferedSex = result[14];
        uniqueResult.push(prefferedSex)
    } else if(result[6]===result[22]){
        var prefferedSex = result[22];
        uniqueResult.push(prefferedSex)
    }else if(result[14]===result[22]){
        var prefferedSex = result[22]
        uniqueResult.push(prefferedSex)
    } 

    
        if(result[5]===result[6]){
            var extraPrefferedSex = result[6]
            uniqueResult.push(extraPrefferedSex);
        } else if (result[5]===result[14]){
            var extraPrefferedSex = result[14]
            uniqueResult.push(extraPrefferedSex);
        } else if (result[5]===result[22]){
            var extraPrefferedSex = result[22]
            uniqueResult.push(extraPrefferedSex);
        } 
    

        for (var i=6;i<uniqueResult.length;i++){
            if(uniqueResult[i]==null||uniqueResult[i]==='Male'||uniqueResult[i]==='Female'||uniqueResult[i]==='Other'){
                uniqueResult.push(uniqueResult.splice(i,1)[0]);
            }
        }
        for (var i=6;i<uniqueResult.length;i++){
            if(uniqueResult[i]==null||uniqueResult[i]==='Male'||uniqueResult[i]==='Female'||uniqueResult[i]==='Other'){
                uniqueResult.push(uniqueResult.splice(i,1)[0]);
            }
        }
        

    console.log(uniqueResult)
    return uniqueResult
}
async function assignValues (){
    var result = await loadUser()
    var id = result[0];
    var first_name = result[1];
    var last_name = result[2];
    var age = result[3];
    var location = result[4];
    var gender = result[5];
    var interests1 = result[6];
    var interests2 = result[7];
    var interests3 = result[8];
    var prefferedSex1 = result[9];
    var prefferedSex2 = result[10];
    var prefferedSex3 = result[11];

    if(typeof prefferedSex2 === 'undefined'){
        var user = new User(id,'','',first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,'','')
    } else if(typeof prefferedSex3 === 'undefined'){
        var user = new User(id,'','',first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,'')
    } else {
        var user = new User(id,'','',first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3)
    }
    return user

}

async function redirect(req,res){
    var user = await assignValues();
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