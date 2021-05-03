var fs = require('fs');
// Have to require the loginController, to find out which user is currently signed in, so you know which user to delete (through the displayname variable)
const loginController = require('./loginController');

var user = {
    table:[]
};

function deleteUser(req,res){
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

        for (var i=0;i<user.table.length;i++){
            console.log(user.table[i].username)
        if (displayName===user.table[i].username&&displayPassword===user.table[i].password){
            user.table.splice(i,1);
            break;
        } 
    }
    console.log(user.table)

//overwrites the json file with the user array data ---null,2 makes it so that its in multiple lines 
fs.writeFile('newUser.json',JSON.stringify(user,null,2),function(err){
if (err) throw err; 
console.log('saved!');
})

res.redirect("/login")

}

module.exports = deleteUser;