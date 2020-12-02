//Classes of models used for the Users (important for the Hardcode)
//imports the model for users
const Users = require('../Model/Users')
//imports the model for interests
const Interest = require('../Model/Interest')

class User {
    constructor (username,password,gender,nationality,location,prefferedSex,interests){
        this.username = username; 
        this.password = password; 
        this.gender = gender; 
        this.nationality = nationality; 
        this.location = location; 
        this. prefferedSex = prefferedSex; 
        this.interests = interests; 
        //this.match = match;
        //this.image = image; 
    }
}

class PaymentUser extends User {
    constructor (username,password,gender,nationality,location,prefferedSex,CreditCard,interests){
    super(username,password,gender,nationality,location,prefferedSex,interests);
    this.CreditCard = CreditCard; 
    }
}

class FreeUser extends User {
    constructor (username,password,gender,nationality,location,prefferedSex,interests){
        super(username,password,gender,nationality,location,prefferedSex,interests);
    }

    //Could include some function that limits the amount of likes/matches
    like_limit(likes){
        
        

    }

}


   
//Conjoins the two users in an array
var Array = [PaymentUser,FreeUser];



//Allows the array to be found in the other files 

module.exports = Array; 
 