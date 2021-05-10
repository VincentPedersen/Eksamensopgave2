var functionPost = require('../../Azure functions/FunctionPOST');
var User = require('../../Model/Users');

async function renderUserProfile (email){
    
    var result = await functionPost.renderUserProfile(email);
    console.log(result)
    var uniqueResult = [...new Set(result)]
    console.log(uniqueResult)

    //Makes sure that if for some reason your last- and firstname are the same, that your last name doesn't get deleted
    if(result[2]===result[3]){
        var last_name = result[3]
        uniqueResult.splice(3,0,last_name);
    }
    //Makes sure that if you have only chosen one prefferedSex, that it doesn't delete the two nulls
    if(result[8]===result[17]){
        var prefferedSex = result[17];
        uniqueResult.push(prefferedSex)
    } else if(result[17]===result[26]){
        var prefferedSex = result[26]
        uniqueResult.push(prefferedSex)
    } else if(result[8]===result[26]){
        var prefferedSex = result[26]
        uniqueResult.push(prefferedSex)
    }
   
        if(result[6]===result[8]){
            var extraPrefferedSex = result[8];
            uniqueResult.push(extraPrefferedSex);

        }else if(result[6]===result[26]){
            var extraPrefferedSex = result[26];
            uniqueResult.push(extraPrefferedSex); 
        }else if(result[6]===result[17]){
            var extraPrefferedSex = result[17];
            uniqueResult.push(extraPrefferedSex);
        } 
    
        for (var i=7;i<uniqueResult.length;i++){
            if(uniqueResult[i]==null||uniqueResult[i]==='Male'||uniqueResult[i]==='Female'||uniqueResult[i]==='Other'){
                uniqueResult.push(uniqueResult.splice(i,1)[0]);
            }
        }
        for (var i=7;i<uniqueResult.length;i++){
            if(uniqueResult[i]==null||uniqueResult[i]==='Male'||uniqueResult[i]==='Female'||uniqueResult[i]==='Other'){
                uniqueResult.push(uniqueResult.splice(i,1)[0]);
            }
        }
    console.log(uniqueResult)
    
    return uniqueResult;
}

async function assignValues(email){
    var result = await renderUserProfile(email);
    var id = result[0]
    var email = result[1]
    var first_name = result[2];
    var last_name = result[3];
    var age = result[4];
    var Location = result[5];
    var gender = result[6];
    var interests1 = result[7];
    var interests2 = result[8];
    var interests3 = result[9];
    var prefferedSex1 = result[10];
    var prefferedSex2 = result[11];
    var prefferedSex3 = result[12];

    if(typeof prefferedSex2 === 'undefined'){
        var user = new User(id,email,'',first_name,last_name,age,Location,gender,interests1,interests2,interests3,prefferedSex1,'','')
    } else if(typeof prefferedSex3 === 'undefined'){
        var user = new User(id,email,'',first_name,last_name,age,Location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,'')
    } else {
        var user = new User(id,email,'',first_name,last_name,age,Location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3)
    }

    return user
}

//most definetely not the best way to do this!!!
async function redirect(req,res,email,counter){
    var user = await assignValues(email);
    //console.log(user)
        if (counter===1){
            res.redirect("/homepage");
        } else if (counter===2){
            res.redirect("/editUser");
        } else if(counter===3){
            res.redirect("/fullProfile")
        } else {
            console.log("Oops something went wrong")
        }
    
    
    
    return user
}

module.exports = {
    redirect,
    renderUserProfile
}; 