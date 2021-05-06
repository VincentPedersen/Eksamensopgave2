const bcrypt = require('bcrypt')
const saltRounds = 10;


class User {
    constructor (email,password,first_name,last_name,age,location,gender){
        this.email = email; 
        this.password = password; 
        this.first_name = first_name;
        this.last_name = last_name; 
        this.age = age; 
        this.location = location;
        this.gender = gender; 
        //this.nationality = nationality;  
        //this. prefferedSex = prefferedSex; 
        //this.interests = interests; 
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

    

}


   
//Conjoins the two users in an array
var Array = [PaymentUser,FreeUser];



//Allows the array to be found in the other files 

module.exports = User; 
 