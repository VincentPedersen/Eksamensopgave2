var fs = require('fs');
var alert = require('alert');
var user = {
    table:[]
};




function createNewUser(req,res) {
    var counter = 0;
    try {
//reads whats currently in the json file and makes it into a js object and pushes it to the empty array
let data = fs.readFileSync('newUser.json',"utf8");
if (data!==undefined||data.length>0){
user = JSON.parse(data);

}

if (data==undefined) throw "the file is empty"
    } catch (err) {
        console.log(err)
    }


//checks to see if the username already exists
for (var i=0;i<user.table.length;i++){
    if (req.body.username.toLowerCase()===user.table[i].username.toLowerCase()){
        alert("That username is already taken!");
        res.redirect("/signup")
        counter++

    } 
}

//pushes the newly created users data into the array
if (counter===0){
user.table.push({
    username: req.body.username,
    password: req.body.password,
    gender:req.body.gender,
    nationality:req.body.nationality,
    location:req.body.location,
    prefferedSex:req.body.prefferedSex,
    interests:req.body.interests

})
}




//overwrites the json file with the user array data ---null,2 makes it so that its in multiple lines 
fs.writeFile('newUser.json',JSON.stringify(user,null,2),function(err){
    if (err) throw err; 
    console.log('saved!');
})

//redirects to the login page after submit - will need some validation so not all submit clicks go to login
res.redirect("/login")
}


module.exports = createNewUser; 