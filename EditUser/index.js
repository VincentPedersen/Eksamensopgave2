var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,newemail,email,first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3) => {
    var result = "";

    //Create connection object
    const connection = new Connection(config)


    //Create the command to be executed
    const request = new Request(`DECLARE @user_id INT 
                                SELECT @user_id = _User.id
                                FROM [dating_app].[User] AS _User
                                WHERE _User.email = '${email}'
                                UPDATE [dating_app].[User] SET email = '${newemail}',first_name = '${first_name}',last_name = '${last_name}',age = '${age}', location = '${location}', gender_id = '${gender}' WHERE email='${email}'
                                UPDATE [dating_app].[Interested_in_gender] SET Gender_id = '${prefferedSex3}' WHERE id IN (SELECT TOP(3) id FROM [dating_app].[Interested_in_gender] WHERE User_id = @user_id ORDER BY id ASC)
                                UPDATE [dating_app].[Interested_in_gender] SET Gender_id = '${prefferedSex2}' WHERE id IN (SELECT TOP(2) id FROM [dating_app].[Interested_in_gender] WHERE User_id = @user_id ORDER BY id ASC)
                                UPDATE [dating_app].[Interested_in_gender] SET Gender_id = '${prefferedSex1}' WHERE id IN (SELECT TOP(1) id FROM [dating_app].[Interested_in_gender] WHERE User_id = @user_id ORDER BY id ASC)
                                UPDATE [dating_app].[User_Interests] SET Interests_id = '${interests3}' WHERE id IN (SELECT TOP(3) id FROM [dating_app].[User_Interests] WHERE User_id = @user_id ORDER BY id ASC)
                                UPDATE [dating_app].[User_Interests] SET Interests_id = '${interests2}' WHERE id IN (SELECT TOP(2) id FROM [dating_app].[User_Interests] WHERE User_id = @user_id ORDER BY id ASC)
                                UPDATE [dating_app].[User_Interests] SET Interests_id = '${interests1}' WHERE id IN (SELECT TOP(1) id FROM [dating_app].[User_Interests] WHERE User_id = @user_id ORDER BY id ASC)`,function(err){
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

function editUser (context, req) {
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const newemail = (req.query.newemail || (req.body && req.body.newemail));
    const email = (req.query.email || (req.body && req.body.email));
    const first_name = (req.query.first_name || (req.body && req.body.first_name));
    const last_name = (req.query.last_name || (req.body && req.body.last_name));
    const age = (req.query.age || (req.body && req.body.age));
    const location = (req.query.location || (req.body && req.body.location));
    const gender = (req.query.gender || (req.body && req.body.gender));
    const interests1 = (req.query.interests1 || (req.body && req.body.interests1))
    const interests2 = (req.query.interests2 || (req.body && req.body.interests2))
    const interests3 = (req.query.interests3 || (req.body && req.body.interests3))
    const prefferedSex1 = (req.query.prefferedSex1 || (req.body && req.body.prefferedSex1)) 
    const prefferedSex2 = (req.query.prefferedSex2 || (req.body && req.body.prefferedSex2)) 
    const prefferedSex3 = (req.query.prefferedSex3 || (req.body && req.body.prefferedSex3)) 

    executeSQL(context,newemail,email,first_name,last_name,age,location,gender,interests1,interests2,interests3,prefferedSex1,prefferedSex2,prefferedSex3)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = editUser;