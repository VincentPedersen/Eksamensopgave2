//var bodyParser = require('body-parser')
var fs = require('fs');
var alert = require('alert');

var user = {
    table:[]
};

var likes = {
    table:[]
};
var counter = 0;



function login (req,res){
    try {

        var jsonUsers = fs.readFileSync('newUser.json',"utf8")
        //console.log(jsonUsers)
        if (jsonUsers!==undefined||jsonUsers.length>0){
        user = JSON.parse(jsonUsers);
        }
        if (user==undefined) throw "file is empty"
        } catch (err){
            console.log(err)
        }

        try {

            var jsonlikes = fs.readFileSync('likes.json',"utf8")
            //console.log(jsonUsers)
            if (jsonlikes!==undefined||jsonlikes.length>0){
            likes = JSON.parse(jsonlikes);
            }
            if (likes==undefined) throw "file is empty"
            } catch (err){
                console.log(err)
            }

var loginUsername = req.body.loginusername
var loginPassword = req.body.loginpassword
for (var i=0;i<user.table.length;i++){
if (loginUsername===user.table[i].username&&loginPassword===user.table[i].password){
    counter++
    break;
} 

}
//makes sure the variable isn't being assigned if the for loop didn't find any matches of username and password
if (counter!==0){
displayName = user.table[i].username;
displayPassword = user.table[i].password;
displayGender = user.table[i].gender;
displayNationality = user.table[i].nationality;
displayLocation = user.table[i].location;
displayPrefferedSex = user.table[i].prefferedSex;
displayInterests = user.table[i].interests;
}

if (counter>0){
 res.redirect("/homepage")
}else {
    res.redirect("/login")
    alert("Wrong username or password!");
}

counter = 0; 
}



module.exports = login; 




