
const loginController = require('./loginController');
function logOut(req,res){

    displayName = undefined;
    displayPassword = undefined;
    displayGender = undefined;
    displayNationality = undefined;
    displayLocation = undefined;
    displayPrefferedSex = undefined;
    displayInterests = undefined;

    res.redirect("/login")
}
module.exports = logOut;