var expect = require('chai').expect; 
var request = require("request");
//tests a few different azure functions 
//If they fail it might be because the different users have been deleted from the database

describe("Get id from email",function(){

    var url = 'http://localhost:7071/api/GetIdFromEmail?email=ag@navipartner.dk';
    it('It returns status 200',function(done){
        //1. Arrange
        
       request(url,function(error,response,body){
           expect(response.statusCode).to.equal(200);
           done();
       });
           
       
    });

    it('It returns correct id',function(done){
        //1. Arrange
        
        var result = '68';
        
       request(url,function(error,response,body){
           expect(body).to.equal(result);
           done();
       });
           
       
    });
});

describe("Login - get password from email",function(){

    var url = 'http://localhost:7071/api/Login?email=ag@navipartner.dk';
    it('It returns status 200',function(done){
        //1. Arrange
        
       request(url,function(error,response,body){
           expect(response.statusCode).to.equal(200);
           done();
       });
           
       
    });

    it('It returns correct password',function(done){
        //1. Arrange
        
        var result = '$2b$10$G9MUvLxetCBv3too/VP9j.AEwneMdLugIGCpuvafAFzXVd/izUqj2';
        
       request(url,function(error,response,body){
           expect(body).to.equal(result);
           done();
       });
           
       
    });
});

describe("Check for match",function(){

    var url = 'http://localhost:7071/api/CheckForMatch?email=ag@navipartner.dk&user2_id=58';
    it('It returns status 200',function(done){
        //1. Arrange
        
       request(url,function(error,response,body){
           expect(response.statusCode).to.equal(200);
           done();
       });
           
       
    });

    it('It returnst the correct like id',function(done){
        //1. Arrange
        
        var Like_id = 67;
        
       request(url,function(error,response,body){
           expect(body).to.include(Like_id);
           done();
       });
           
       
    });
});