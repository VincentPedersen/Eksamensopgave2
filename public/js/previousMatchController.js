const matchController = require('./matchController');


 
function previous (req,res){
    
    q--;
  

    matchProfileUsername = matchArray.table[q].username;
    matchProfilePassword = matchArray.table[q].password;
    matchProfileGender = matchArray.table[q].gender;
    matchProfileNationality = matchArray.table[q].nationality; 
    matchProfileLocation = matchArray.table[q].location;
    matchProfilePrefferedSex = matchArray.table[q].prefferedSex;
    matchProfileInterests = matchArray.table[q].interests;
    console.log(q);
   
    nextButtonVisibility = true;

    if (q===0){
        previousButtonVisibility = false;
    }


res.redirect("/matches");
}

module.exports = previous; 