var fs = require('fs');
const user = [];

function createNewUser(req,res) {
user.push({
    username: req.body.username,
    password: req.body.password,
    gender:req.body.gender,
    nationality:req.body.nationality,
    location:req.body.location,
    prefferedSex:req.body.prefferedSex,
    interests:req.body.interests
})

fs.appendFile('newUser.json',JSON.stringify(user),function(err){
    if (err) throw err; 
    console.log('saved!');
})
console.log(user)
}

module.exports = createNewUser; 