var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const config = require('../Database/config.json');

const executeSQL = (context,email,first_name,last_name,age,location,gender,password) => {
    var result = "";

    //Create connection object
    const connection = new Connection(config)


    //Create the command to be executed
    const request = new Request(`INSERT INTO [dating_app].[User] (email,first_name,last_name,age,location,gender_id,password) VALUES ('${email}','${first_name}','${last_name}','${age}','${location}','${gender}','${password}')`,function(err){
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

function signUp (context, req) {
    console.log(req.body.passwordHash);
    try {
    context.log('JavaScript HTTP trigger function processed a request.');
    const email = (req.query.email || (req.body && req.body.email));
    const first_name = (req.query.first_name || (req.body && req.body.first_name));
    const last_name = (req.query.last_name || (req.body && req.body.last_name));
    const age = (req.query.age || (req.body && req.body.age));
    const location = (req.query.location || (req.body && req.body.location));
    const gender = (req.query.gender || (req.body && req.body.gender));
    const password = (req.query.password || (req.body && req.body.password));

    executeSQL(context,email,first_name,last_name,age,location,gender,password)
    }
    catch (err){
        console.log(err)
    }
}
module.exports = signUp;

