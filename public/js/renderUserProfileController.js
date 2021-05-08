var functionPost = require('../../Azure functions/FunctionPOST');
var User = require('../../Model/Users');

async function renderUserProfile (email){
    var result = await functionPost.renderUserProfile(email);
    return result;
}

async function assignValues(email){
    var result = await renderUserProfile(email);
    var email = result[0]
    var first_name = result[1];
    var last_name = result[2];
    var age = result[3];
    var Location = result[4];
    var gender = result[5];

    var user = new User(email,'',first_name,last_name,age,Location,gender)
    return user
}

//most definetely not the best way to do this!!!
async function redirect(req,res,email,counter){
    var user = await assignValues(email);
        if (counter===1){
            res.redirect("/homepage");
        } else if (counter===2){
            res.redirect("/editUser");
        } else {
            console.log("Oops something went wrong")
        }
    
    
    
    return user
}

module.exports = redirect 