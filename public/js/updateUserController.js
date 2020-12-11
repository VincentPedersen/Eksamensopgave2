var fs = require('fs');
var alert = require('alert');
// Have to require the loginController, to find out which user is currently signed in, so you know which user to delete (through the displayname variable)
const loginController = require('./loginController');

var user = {
    table:[]
};

var likes = {
    table:[]
};

var dislikes = {
    table:[]
};
var counter = 0;
//after having edited user, it changes what user info is displayed on the homepage
function updateUser (req,res){

    //reads the users and puts them in an array 
    try {

        var jsonUsers = fs.readFileSync('newUser.json',"utf8")
        if (jsonUsers!==undefined||jsonUsers.length>0){
        user = JSON.parse(jsonUsers);
        }
        if (user==undefined) throw "file is empty"
        } catch (err){
            console.log(err)
        }

        //reads the likes and puts them in an array 
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

            //reads the dislikes and puts them in an array
            try {

                var jsondislikes = fs.readFileSync('dislikes.json',"utf8")
                if (jsondislikes!==undefined||jsondislikes.length>0){
                dislikes = JSON.parse(jsondislikes);
                }
                if (dislikes==undefined) throw "file is empty"
                } catch (err){
                    console.log(err)
                }

        for (var i=0;i<user.table.length;i++){
        if (displayName===user.table[i].username&&displayPassword===user.table[i].password){
            if (req.body.updateUsername>""){
            user.table[i].username = req.body.updateUsername;
            } 
            if (req.body.updatePassword>""){
                user.table[i].password = req.body.updatePassword;
                } 
            if (req.body.updateGender!==undefined){
                user.table[i].gender = req.body.updateGender;
                } 
            if (req.body.updateNationality>""){
                user.table[i].nationality = req.body.updateNationality;
                } 
            if (req.body.updateLocation>""){
                user.table[i].location = req.body.updateLocation;
                } 
            if (req.body.updatePrefferedSex!==undefined){
                user.table[i].prefferedSex = req.body.updatePrefferedSex;
                } 
            if (req.body.updateInterests>""){
                user.table[i].interests = req.body.updateInterests
                } 
                break;
        } 
    }
    //makes sure a user doesn't change his/her username to something another person already has
    for (var g=0;g<user.table.length;g++){
        if(user.table[i].username.toLowerCase()===user.table[g].username.toLowerCase()){
            counter++
        }
    }
    

    //makes sure the already made likes also update if the person updates their username
    for (var j=0;j<likes.table.length;j++){
        if(displayName===likes.table[j].username){
            likes.table[j].username = user.table[i].username;
        }
        if (displayName===likes.table[j].username2){
            likes.table[j].username2 = user.table[i].username;
        }
    }

    for (j=0;j<dislikes.table.length;j++){
        if(displayName===dislikes.table[j].username){
            dislikes.table[j].username = user.table[i].username;
        }
        if (displayName===likes.table[j].username2){
            dislikes.table[j].username2 = user.table[i].username;
        }
    }
    
if(counter<=1){
    displayName = user.table[i].username;
    displayPassword = user.table[i].password;
    displayGender = user.table[i].gender;
    displayNationality = user.table[i].nationality;
    displayLocation = user.table[i].location;
    displayPrefferedSex = user.table[i].prefferedSex;
    displayInterests = user.table[i].interests;
}
   


//writes the changes to newUser.json
if(counter<=1){
fs.writeFile('newUser.json',JSON.stringify(user,null,2),function(err){
 if (err) throw err; 
console.log('saved!');
 })

//writes the changes to likes.json -- if there is any
 fs.writeFileSync('likes.json',JSON.stringify(likes,null,2),function(err){
    if (err) throw err; 
   console.log('saved!');
    })
//writes the changes to dislikes.json --if there is any
    fs.writeFileSync('dislikes.json',JSON.stringify(dislikes,null,2),function(err){
        if (err) throw err; 
       console.log('saved!');
        })
    

 res.redirect("/homepage")
    } else {
        res.redirect("/editUser");
        alert("That username is already taken");
    }
 counter = 0;
}

module.exports = updateUser;