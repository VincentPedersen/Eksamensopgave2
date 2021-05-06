var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,email,hash) => {
    var result = "";

    //Create connection object
    const connection = new Connection(config)


    //Create the command to be executed
    const request = new Request(`UPDATE [dating_app].[User] SET password = '${hash}' WHERE email='${email}'`,function(err){
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

function newPassword (context, req) {
    console.log(req.body.passwordHash);
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const email = (req.query.email || (req.body && req.body.email));
    const hash = (req.query.hash || (req.body && req.body.hash));

    executeSQL(context,email,hash)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = newPassword;