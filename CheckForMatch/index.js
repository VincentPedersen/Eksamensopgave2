var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,email,user2_id) => {
    var result = [];

    //Create connection object
    const connection = new Connection(config)


    //Create the command to be executed
    //Makes a self join (a join on the same table) to check if it's a match
    const request = new Request(`DECLARE @user_id INT
                                SELECT @user_id = _User.id
                                FROM [dating_app].[User] AS _User
                                WHERE _User.email = '${email}'
                                SELECT _Likes.id
                                FROM [dating_app].[Likes] AS _Likes, [dating_app].[Likes] AS _Likes2
                                WHERE _Likes.User_id = _Likes2.User2_id
                                AND _Likes.User2_id = _Likes2.User_id
                                AND (_Likes.User_id = @user_id OR _Likes.User2_id = @user_id)
                                AND(_Likes2.User_id = '${user2_id}' OR _Likes2.User2_id = '${user2_id}')`,function(err){
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

function checkForMatch (context, req) {
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const email = (req.query.email || (req.body && req.body.email));
    const user2_id = (req.query.user2_id || (req.body && req.body.user2_id));

    executeSQL(context,email,user2_id)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = checkForMatch;