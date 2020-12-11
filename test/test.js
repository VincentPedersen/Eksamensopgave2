var expect = require('chai').expect; 
var login = require('../public/js/loginController');

describe('login()',function(req,res){
    it('should log a user in if the username and password is correct',function(req,res){
        //1. Arrange

        var loginUsername = "Vincent";
        var loginPassword = "1234"
        var counter = 1
        

        //2. Act
        var result2 = login(loginUsername,loginPassword);


        //3. Assert

        expect(result2).to.be.equal(counter);



    });
});