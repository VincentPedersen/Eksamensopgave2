var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,email,first_name,last_name,age,location,gender,password,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3) => {
    var result = "";

    //Create connection object
    const connection = new Connection(config)
   





    //Create the command to be executed
    
    
        const request = new Request(`INSERT INTO [dating_app].[User] (email,first_name,last_name,age,location,gender_id,password) VALUES ('${email}','${first_name}','${last_name}','${age}','${location}','${gender}','${password}')
                                DECLARE @user_id INT
                                SELECT @user_id = _User.id
                                FROM [dating_app].[User] AS _User
                                WHERE _User.email = '${email}'  
                                INSERT INTO [dating_app].[User_Interests](User_id,Interests_id) VALUES (@user_id,'${interests1}')  
                                INSERT INTO [dating_app].[User_Interests](User_id,Interests_id) VALUES (@user_id,'${interests2}') 
                                INSERT INTO [dating_app].[User_Interests](User_id,Interests_id) VALUES (@user_id,'${interests3}')                       
                                INSERT INTO [dating_app].[Interested_in_gender](User_id,Gender_id) VALUES (@user_id,'${prefferedSex1}') 
                                INSERT INTO [dating_app].[Interested_in_gender](User_id,Gender_id) VALUES (@user_id,'${prefferedSex2}')
                                INSERT INTO [dating_app].[Interested_in_gender](User_id,Gender_id) VALUES (@user_id,'${prefferedSex3}')`,function(err){
        if (err) {
            context.log.error(err);
            context.res.status = 500; 
            context.res.body = "Error executing T-SQL command";
        } else {
            context.res = {
                body: result
            }
        }
        context.done();
        });
        

    
    

    //Execute request 
    connection.on('connect',err =>{
        if (err) {
            context.log.error(err);
            context.res.status = 500; 
            context.res.body = "Error connecting to Azure SQL query";
            context.done();
        } else {
            //Connection succeeded so execute T-SQL
            connection.execSql(request);
        }
        
    }); 


    //Handle result and send back from Azure SQL 
    request.on('row',columns => {
        columns.forEach(column => {
            result += column.value;
        });
    });

    //Connect
    connection.connect();
}

function signUp (context, req) {
    console.log(req.body.passwordHash);
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const email = (req.query.email || (req.body && req.body.email));
    const first_name = (req.query.first_name || (req.body && req.body.first_name));
    const last_name = (req.query.last_name || (req.body && req.body.last_name));
    const age = (req.query.age || (req.body && req.body.age));
    const location = (req.query.location || (req.body && req.body.location));
    const gender = (req.query.gender || (req.body && req.body.gender));
    const password = (req.query.password || (req.body && req.body.password));
    const interests1 = (req.query.interests1 || (req.body && req.body.interests1))
    const interests2 = (req.query.interests2 || (req.body && req.body.interests2))
    const interests3 = (req.query.interests3 || (req.body && req.body.interests3))
    const prefferedSex1 = (req.query.prefferedSex1 || (req.body && req.body.prefferedSex1)) 
    const prefferedSex2 = (req.query.prefferedSex2 || (req.body && req.body.prefferedSex2)) 
    const prefferedSex3 = (req.query.prefferedSex3 || (req.body && req.body.prefferedSex3)) 

    executeSQL(context,email,first_name,last_name,age,location,gender,password,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = signUp;

