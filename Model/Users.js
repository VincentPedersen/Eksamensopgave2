
class User {
    constructor (id,email,password,first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3){
        this.id = id;
        this.email = email; 
        this.password = password; 
        this.first_name = first_name;
        this.last_name = last_name; 
        this.age = age; 
        this.location = location;
        this.gender = gender; 
        this.interests1 = interests1; 
        this.interests2 = interests2; 
        this.interests3 = interests3;   
        this. prefferedSex1 = prefferedSex1;
        this. prefferedSex2 = prefferedSex2;
        this. prefferedSex3 = prefferedSex3;
    }
}



   




//Allows the user to be found in other files 

module.exports = User; 
 