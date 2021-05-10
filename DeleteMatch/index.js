var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');


const executeSQL = (context,userId,user2Id) => {
    var result = "";

    //Create connection object
    const connection = new Connection(config)


    //Create the command to be executed
    const request = new Request(`DELETE 
                                FROM [dating_app].[Match] 
                                WHERE id = (SELECT _Match.id
                                            FROM [dating_app].[Match] AS _Match
                                            WHERE _Match.Like_id = (SELECT _Likes.id FROM [dating_app].[Likes] AS _Likes WHERE _Likes.User_id = '${userId}' AND _Likes.User2_id = '${user2Id}') 
                                            OR _Match.Like2_id = (SELECT _Likes.id FROM [dating_app].[Likes] AS _Likes WHERE _Likes.User_id = '${userId}' AND _Likes.User2_id = '${user2Id}'))
    
                                DELETE 
                                FROM [dating_app].[Likes]
                                WHERE id = (SELECT _Likes.id FROM [dating_app].[Likes] AS _Likes WHERE _Likes.User_id = '${userId}' AND _Likes.User2_id = '${user2Id}')`,function(err){
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

function deleteMatch (context, req) {
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const userId = (req.query.userId || (req.body && req.body.userId));
    const user2Id = (req.query.user2Id || (req.body && req.body.user2Id));

    executeSQL(context,userId,user2Id)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = deleteMatch;