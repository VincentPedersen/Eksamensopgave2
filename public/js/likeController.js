var fs = require('fs');
let alert = require('alert');

// Have to require the loginController, to find out which user is currently signed in, so you know which user to delete (through the displayname variable)
const loginController = require('./loginController');

//have to require loadUserController, to find userProfileUsername
const loadUserController = require('./loadUserController');

//const matchController = require('./matchController');

//likes people...plus updates the view.
function like (req,res){
    var user = {
        table:[]
    };
    
    var likes = {
        table:[]
    };
    var dislikes = {
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

        likes.table.push({
            username: displayName,
            username2:userProfileUsername
        })


        fs.writeFileSync('likes.json',JSON.stringify(likes,null,2),function(err){
            if (err) throw err; 
           console.log('saved!');
            })


//switches what user is being displayed
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
                    

                    try {

                        var jsondislikes = fs.readFileSync('dislikes.json',"utf8")
                        //console.log(jsonUsers)
                        if (jsondislikes!==undefined||jsondislikes.length>0){
                        dislikes = JSON.parse(jsondislikes);
                        }
                        if (dislikes==undefined) throw "file is empty"
                        } catch (err){
                            console.log(err)
                        }

            //notifies if you have matched with the person
            for (var g=0;g<likes.table.length;g++){
                if (userProfileUsername===likes.table[g].username&&displayName===likes.table[g].username2){
                    alert("You have a match! <3")
                }
            }
                    
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
                    
                
}
module.exports = like; 