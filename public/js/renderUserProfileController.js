var functionPost = require('../../Azure functions/FunctionPOST');
var User = require('../../Model/Users');

async function renderUserProfile (email){
    var result = await functionPost.renderUserProfile(email);
    console.log(result);
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
    console.log(user.email)
    return user
}

//most definetely not the best way to do this!!!
async function redirect(req,res,email){
    var user = await assignValues(email);
    console.log(user)
    res.redirect("/homepage");
    return user
}

module.exports = redirect 