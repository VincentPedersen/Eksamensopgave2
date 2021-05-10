var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,email,user2_id,counter) => {
    var result = "";

    //Create connection object
    const connection = new Connection(config)
    var request;
    





    //Create the command to be executed
    //this is also the azure function for disliking someone, I just didn't know how to change the name of the Azure functions

    if (counter===1){
        request = new Request(`DECLARE @user_id INT
                                    SELECT @user_id = _User.id
                                    FROM [dating_app].[User] AS _User
                                    WHERE _User.email = '${email}'
                                    INSERT INTO [dating_app].[Likes] (User_id,User2_id) VALUES (@user_id,'${user2_id}')`,function(err){
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

    } else if (counter===2){
        request = new Request(`DECLARE @user_id INT
                                    SELECT @user_id = _User.id
                                    FROM [dating_app].[User] AS _User
                                    WHERE _User.email = '${email}'
                                    INSERT INTO [dating_app].[Dislikes] (User_id,User2_id) VALUES (@user_id,'${user2_id}')`,function(err){
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
    } else {
        context.log("Something has gone horribly wrong! :(");
        context.done();
    }
        
        
    

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

function likeUser (context, req) {
    console.log(req.body.passwordHash);
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const email = (req.query.email || (req.body && req.body.email));
    const user2_id = (req.query.user2_id || (req.body && req.body.user2_id));
    const counter = (req.query.counter || (req.body && req.body.counter));
    

    executeSQL(context,email,user2_id,counter)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = likeUser;

