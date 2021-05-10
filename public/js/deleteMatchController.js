var fs = require('fs');
let alert = require('alert');

const loginController = require('./loginController');
const likeController = require('./likeAndDislikeController');
const loadUserController = require('./loadUserController');




function deletematch (req,res){
    var likes = {
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
for (var g=0;g<likes.table.length;g++){
    if (displayName===likes.table[g].username&&likes.table[g].username2===matchProfileUsername){
        likes.table.splice(g,1)
        alert("You deleted a match!")
     }
}

fs.writeFileSync('likes.json',JSON.stringify(likes,null,2),function(err){
    if (err) throw err; 
   console.log('saved!');
    })
    
res.redirect("/homepage");

}

module.exports = deletematch; 