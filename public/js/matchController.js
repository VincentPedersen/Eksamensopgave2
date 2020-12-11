var fs = require('fs');
let alert = require('alert');

const loginController = require('./loginController');
const likeController = require('./likeController');
const loadUserController = require('./loadUserController');



function match (req,res){
    var likes = {
        table:[]
    };
    var user = {
        table:[]
    };

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

            matchArray = {
                table:[]
            };
            

for (var g=0;g<likes.table.length;g++){
for (var j=0;j<likes.table.length;j++){
    if (displayName===likes.table[g].username&&likes.table[g].username2===likes.table[j].username&&likes.table[j].username2===displayName){
        var match = likes.table[g].username2;
        for (var i=0;i<user.table.length;i++){
            if(match===user.table[i].username){
                matchArray.table.push(user.table[i]);
            }
        }
        
}

}
    
    
}



    if (matchArray.table.length===0||matchArray.table==undefined){
        alert("You have no matches!");
        res.redirect("/homepage");
    }


console.log(matchArray);

    matchProfileUsername = matchArray.table[0].username;
    matchProfilePassword = matchArray.table[0].password;
    matchProfileGender = matchArray.table[0].gender;
    matchProfileNationality = matchArray.table[0].nationality; 
    matchProfileLocation = matchArray.table[0].location;
    matchProfilePrefferedSex = matchArray.table[0].prefferedSex;
    matchProfileInterests = matchArray.table[0].interests;
if(matchArray.table.length>1){
nextButtonVisibility = true;
} else {
nextButtonVisibility = false;
}
previousButtonVisibility = false;
q=0; 


res.redirect("/matches");

}

module.exports = match; 