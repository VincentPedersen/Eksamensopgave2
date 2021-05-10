var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,email) => {
    var result = [];

    //Create connection object
    const connection = new Connection(config)


    //Create the command to be executed
    //Probably not the best query but oh well, it works
    const request = new Request(`DECLARE @user_id INT
                                SELECT @user_id = _User.id
                                FROM [dating_app].[User] AS _User
                                WHERE _User.email = '${email}' 
                                ORDER BY _User.id ASC

                                DECLARE @smt_id INT
                                SELECT @smt_id = (SELECT top(1) _User.id FROM [dating_app].[User] AS _User JOIN [dating_app].[Gender] AS _Gender ON _User.Gender_id = _Gender.id
                                JOIN [dating_app].[Interested_in_gender] AS _InterestedIn
                                ON _InterestedIn.User_id = _User.id
                                JOIN [dating_app].[Gender] AS _Gender2
                                ON _InterestedIn.Gender_id = _Gender2.id
                                JOIN [dating_app].[User_Interests] AS User_Interest
                                ON User_Interest.User_id = _User.id
                                JOIN [dating_app].[Interests] AS _Interests
                                ON User_Interest.Interests_id = _Interests.id WHERE _User.id IN (SELECT id FROM [dating_app].[User] EXCEPT SELECT User2_id FROM [dating_app].[Likes] WHERE User_id = @user_id EXCEPT SELECT User2_id FROM [dating_app].[Dislikes] WHERE User_id = @user_id)
                                AND email != '${email}' ORDER BY _User.id ASC)

                                DECLARE @ps_id INT
                                SELECT @ps_id = COUNT(_InterestedIn.User_id)
                                FROM [dating_app].[Interested_in_gender] AS _InterestedIn
                                WHERE _InterestedIn.User_id = @smt_id;

                                SELECT TOP(@ps_id*3)_User.id,_User.first_name,_User.last_name,_User.age,_User.location,_Gender.name AS Gender,_Gender2.name AS PrefferedSex, _Interests.name AS Interests
                                FROM [dating_app].[User] AS _User
                                JOIN [dating_app].[Gender] AS _Gender
                                ON _User.Gender_id = _Gender.id
                                JOIN [dating_app].[Interested_in_gender] AS _InterestedIn
                                ON _InterestedIn.User_id = _User.id
                                JOIN [dating_app].[Gender] AS _Gender2
                                ON _InterestedIn.Gender_id = _Gender2.id
                                JOIN [dating_app].[User_Interests] AS User_Interest
                                ON User_Interest.User_id = _User.id
                                JOIN [dating_app].[Interests] AS _Interests
                                ON User_Interest.Interests_id = _Interests.id
                                WHERE _User.id IN (SELECT id FROM [dating_app].[User] EXCEPT SELECT User2_id FROM [dating_app].[Likes] WHERE User_id = @user_id EXCEPT SELECT User2_id FROM [dating_app].[Dislikes] WHERE User_id = @user_id)
                                AND email != '${email}';`,function(err){
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

function loadUsers (context, req) {
    
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const email = (req.query.email || (req.body && req.body.email));


    executeSQL(context,email)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = loadUsers;