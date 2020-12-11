const loginController=require('./loginController')
function stayLoggedin(req,res){
try {
    if(displayName!=undefined){
        res.redirect("/homepage");
    
    }if (displayName==undefined) throw "file is empty"
    } catch (err){
    console.log(err)
}
res.redirect("/login");

}
module.exports = stayLoggedin