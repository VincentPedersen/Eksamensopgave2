var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context) => {
    var result = "";

    //Create connection object
    const connection = new Connection(config)


    //Create the command to be executed
    const request = new Request(`SELECT COUNT(id) FROM [dating_app].[Match]`,function(err){
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

function adminAmountMatches (context, req) {
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    

    executeSQL(context)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = adminAmountMatches;