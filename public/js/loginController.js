//var bodyParser = require('body-parser')
var fs = require('fs');

var user = {
    table:[]
};
var counter = 0;

//have to make so that this function runs after createNewUSer - asynchronys programming
function login (req,res){

    try {

        var jsonUsers = fs.readFileSync('newUser.json',"utf8")
        console.log(jsonUsers)
        if (jsonUsers!==undefined||jsonUsers.length>0){
        user = JSON.parse(jsonUsers);
        }
        if (user==undefined) throw "file is empty"
        } catch (err){
            console.log(err)
        }

var loginUsername = req.body.loginusername
var loginPassword = req.body.loginpassword
for (i=0;i<user.table.length;i++){
    console.log(user.table[i].username)
if (loginUsername===user.table[i].username&&loginPassword===user.table[i].password){
    counter++
} 

}
if (counter>0){
    res.redirect("/")
}else {
    res.redirect("/login")
    console.log(user.table[1].username)
}

counter = 0; 
}

//console.log(user.table)
//console.log(user.table[1].username)

module.exports = login; 



