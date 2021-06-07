var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,email,minAge,maxAge) => {
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

                                DECLARE @user_gender varchar(32)
                                SELECT @user_gender = _Gender.name
                                FROM [dating_app].[Gender] AS _Gender
                                JOIN [dating_app].[User] AS _User 
                                ON _User.Gender_id = _Gender.id
                                WHERE _User.email = '${email}' 

                                SELECT name
                                INTO #UserPrefSexTable
                                FROM [dating_app].[Gender] AS _Gender
                                JOIN [dating_app].[Interested_in_gender] AS _InterestedIn
                                ON _Gender.id = _InterestedIn.Gender_id
                                JOIN [dating_app].[User] AS _User
                                ON _InterestedIn.User_id = _User.id
                                WHERE _User.email = '${email}'

                                SELECT TOP(3)_User.id,_User.first_name,_User.last_name,_User.age,_User.location,_Gender.name AS Gender, _Interests.name AS Interests
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
                                AND _User.email != '${email}'
                                AND _User.id != 52
                                AND _Gender2.name = @user_gender
                                AND _Gender.name IN (SELECT name FROM #UserPrefSexTable)
                                AND _User.age BETWEEN '${minAge}' AND '${maxAge}'`,function(err){
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
    const minAge = (req.query.minAge || (req.body && req.body.minAge));
    const maxAge = (req.query.maxAge || (req.body && req.body.maxAge));


    executeSQL(context,email,minAge,maxAge)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = loadUsers;