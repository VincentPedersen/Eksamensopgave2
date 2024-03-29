var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,email) => {
    var result = [];

    //Create connection object
    const connection = new Connection(config)


    //Create the command to be executed
    const request = new Request(`SELECT _User.id,_User.email,_User.First_name,_User.Last_Name,_User.Age,_User.Location,_Gender2.name AS Gender, _Interests.name AS Interests,_Gender.name AS PrefferedSex
                                FROM [dating_app].[User] AS _User
                                JOIN [dating_app].[Interested_in_gender] AS _InterestedIn
                                ON _InterestedIn.User_id = _User.id
                                JOIN [dating_app].[Gender] AS _Gender
                                ON _InterestedIn.Gender_id = _Gender.id
                                JOIN [dating_app].[User_Interests] AS _UserInterest
                                ON _UserInterest.User_id = _User.id
                                JOIN [dating_app].[Interests] AS _Interests
                                ON _UserInterest.Interests_id = _Interests.id
                                JOIN [dating_app].[Gender] AS _Gender2
                                ON _User.Gender_id = _Gender2.id
                                WHERE email='${email}'`,function(err){
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
            result.push(column.value);
        });
    });

    //Connect
    connection.connect();
}

function RenderUserProfile (context, req) {
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const email = (req.query.email || (req.body && req.body.email));

    executeSQL(context,email)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = RenderUserProfile;