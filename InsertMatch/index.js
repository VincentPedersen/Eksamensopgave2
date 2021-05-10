var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,like1,like2) => {
    var result = "";

    //Create connection object
    const connection = new Connection(config)
    
    





    //Create the command to be executed

        const request = new Request(`INSERT INTO [dating_app].[Match] (Like_id,Like2_id) VALUES ('${like1}','${like2}')`,function(err){
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

function insertMatch (context, req) {
    console.log(req.body.passwordHash);
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const like1 = (req.query.like1 || (req.body && req.body.like1));
    const like2 = (req.query.like2 || (req.body && req.body.like2));
    
    

    executeSQL(context,like1,like2)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = insertMatch;
