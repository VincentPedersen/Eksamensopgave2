var fs = require('fs');
let alert = require('alert');

var user = {
    table:[]
};

var likes = {
    table:[]
};
var dislikes = {
    table:[]
};


// Have to require the loginController, to find out which user is currently signed in, so you know which user to delete (through the displayname variable)
const loginController = require('./loginController');

//loads the potential new matches (the people you haven't liked or disliked yet)
function loadUser (req,res){
    
    try {

        var jsonUsers = fs.readFileSync('newUser.json',"utf8")
        if (jsonUsers!==undefined||jsonUsers.length>0){
        user = JSON.parse(jsonUsers);
        }
        if (user==undefined) throw "file is empty"
        } catch (err){
            console.log(err)
        }


        try {

            var jsonlikes = fs.readFileSync('likes.json',"utf8")
            if (jsonlikes!==undefined||jsonlikes.length>0){
            likes = JSON.parse(jsonlikes);
            }
            if (likes==undefined) throw "file is empty"
            } catch (err){
                console.log(err)
            }
        
            try {

                var jsondislikes = fs.readFileSync('dislikes.json',"utf8")
                if (jsondislikes!==undefined||jsondislikes.length>0){
                dislikes = JSON.parse(jsondislikes);
                }
                if (dislikes==undefined) throw "file is empty"
                } catch (err){
                    console.log(err)
                }

    
        //switches what user is being displayed
        
           for (var h=0;h<user.table.length;h++){
            if(displayName===user.table[h].username){
                user.table.splice(h,1);     
        }
    }
       for (var k=0;k<user.table.length;k++){
        for (var i=0;i<likes.table.length;i++){
        if (displayName===likes.table[i].username&&likes.table[i].username2===user.table[k].username) {   
           user.table.splice(k,1);   
           if (k!==0){
            k--;
            } 
            
        }
        }
    }  

    for (var g=0;g<user.table.length;g++){
        for (var r=0;r<dislikes.table.length;r++){
        if (displayName===dislikes.table[r].username&&dislikes.table[r].username2===user.table[g].username) {   
           user.table.splice(g,1);   
           if (g!==0){
            g--;
            } 
            
        }
        }
    }  
        
                if (user.table.length===0||user.table==undefined){
                    res.redirect("/homepage")
                    alert("There are no more users to like!");
                } else if (user.table[0]!=undefined){
                userProfileUsername = user.table[0].username;
                userProfilePassword = user.table[0].password;
                userProfileGender = user.table[0].gender;
                userProfileNationality = user.table[0].nationality;
                userProfileLocation = user.table[0].location;
                userProfilePrefferedSex = user.table[0].prefferedSex;
                userProfileInterests = user.table[0].interests;

                res.redirect("/like")
                } 

res.redirect("/like")
}
module.exports = loadUser; 