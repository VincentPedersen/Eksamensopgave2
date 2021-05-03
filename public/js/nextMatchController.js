const matchController = require('./matchController');



function next (req,res){
    
    q++;
    matchProfileUsername = matchArray.table[q].username;
    matchProfilePassword = matchArray.table[q].password;
    matchProfileGender = matchArray.table[q].gender;
    matchProfileNationality = matchArray.table[q].nationality; 
    matchProfileLocation = matchArray.table[q].location;
    matchProfilePrefferedSex = matchArray.table[q].prefferedSex;
    matchProfileInterests = matchArray.table[q].interests;
    console.log(q)
    
    previousButtonVisibility = true;

if(q<matchArray.table.length-1){
    nextButtonVisibility = true;
} else {
    nextButtonVisibility = false;
}



res.redirect("/matches");

}

module.exports = next; 