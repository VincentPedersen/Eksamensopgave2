var fs = require('fs');
let alert = require('alert');
var functionPost = require('../../Azure functions/FunctionPOST');
var User = require('../../Model/Users');
var app = require('../../app');
const e = require('express');



//In general pretty ugly code in this controller, but it does its job
function smtMatch(req,res){
    var counter=0;
    app.getMatches(req,res,counter)
}

function smtNextMatch(req,res){
    var counter=1;
    app.getMatches(req,res,counter)
}

function smtPreviousMatch(req,res){
    var counter=2;
    app.getMatches(req,res,counter)
}
async function match (req,res){

    var email = localStorage.getItem('email');
    var result = await Promise.resolve(functionPost.getMatch(email));
    if (typeof result[0]==='undefined'){
        alert("You have no matches")
        app.getVariables(req,res)
        
    } else {
        var ownUser = await Promise.resolve(functionPost.renderUserProfile(email));
    

        var ownid = ownUser[0];
        var ownFirstName = ownUser[2];
        var ownLastName = ownUser[3];

        console.log(result)

        const obj = {
            input: result,
            removeItem(item) {
            this.input = this.input.filter(i => i !== item);
            return this;
        }
        }
     
        const output = obj.removeItem(ownid)
                            .removeItem(ownFirstName)
                            .removeItem(ownLastName);
           
        console.log(output.input);

        global.localStorage.setItem('matches',output.input)
        console.log(localStorage.getItem('matches'))
        //Gross with global variable...I know, just couldn't think of another way to fix this
        q = 0;

        var id = output.input[0]
        var first_name = output.input[1]
        var last_name = output.input[2]


    
     

        var user = new User(id,'','',first_name,last_name,'',)
    

        var matches = localStorage.getItem('matches');
        var matchesArray = matches.split(",")
        console.log(matchesArray)

        if(matchesArray.length>3){
            nextButtonVisibility = true;
            } else {
            nextButtonVisibility = false;
            }
            previousButtonVisibility = false;
        

            res.redirect("/matches")

        return user; 
    }
}

function nextMatch (req,res){
   var matches = localStorage.getItem('matches');
   var matchesArray = matches.split(",")
   q = q+3
   matchesArray.splice(0,q);
   var id = matchesArray[0];
   var first_name = matchesArray[1];
   var last_name = matchesArray[2];

   var user = new User(id,'','',first_name,last_name,'',)
    console.log(matchesArray);


    if(matchesArray.length>3){
        nextButtonVisibility = true;
        } else {
        nextButtonVisibility = false;
        }
        previousButtonVisibility = true;
    res.redirect("/matches")
    return user


}

function previousMatch (req,res){
    var matches = localStorage.getItem('matches');
    var matchesArray = matches.split(",")
    q = q-3
    matchesArray.splice(0,q);
    var id = matchesArray[0];
    var first_name = matchesArray[1];
    var last_name = matchesArray[2];
 
    var user = new User(id,'','',first_name,last_name,'',)
     console.log(matchesArray);
 
     

     if(matchesArray.length>3){
        nextButtonVisibility = true;
        } else {
        nextButtonVisibility = false;
        }
    if (q===0){
        previousButtonVisibility = false;
    }
     res.redirect("/matches")
     return user
 
 
 }

async function seeFullMatch(req,res){
    var matches = localStorage.getItem('matches');
    var matchesArray = matches.split(",")
    matchesArray.splice(0,q);
    var id = matchesArray[0];
    var first_name = matchesArray[1];
    var last_name = matchesArray[2];

    var user = new User(id,'','',first_name,last_name,'',)

    var email = await Promise.resolve(functionPost.getEmailFromId(user))

    app.getFullProfileMatch(req,res,email)
    return email
}

async function deleteMatch(req,res){
    var matches = localStorage.getItem('matches');
    var matchesArray = matches.split(",")
    matchesArray.splice(0,q);
    var user2_id = matchesArray[0];
    var email = localStorage.getItem('email');

    var user_id = await Promise.resolve(functionPost.getIdFromEmail(email))


    var result = await Promise.resolve(functionPost.deleteMatch(user_id,user2_id))

    smtMatch(req,res)
}


module.exports = {
    smtMatch,
    smtNextMatch,
    smtPreviousMatch,
    match,
    nextMatch,
    previousMatch,
    seeFullMatch,
    deleteMatch
};