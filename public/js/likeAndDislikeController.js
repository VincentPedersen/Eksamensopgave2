var fs = require('fs');
let alert = require('alert');
var functionPost = require('../../Azure functions/FunctionPOST');
var app = require('../../app');
var Match = require('../../Model/Match');


//likes people...plus updates the view.
async function like (req,res){
    //a number used so the azure function knows its like..since the same azure function is used for like and dislike
    var counter = 1;
    var email = localStorage.getItem('email');
    var user2_id = localStorage.getItem('user2_id');
    

    response = await Promise.resolve(functionPost.likeUser(email,user2_id,counter));

    var possibleMatch = await Promise.resolve (functionPost.checkForMatch(email,user2_id));
    console.log(possibleMatch)
    if(typeof possibleMatch!=='undefined'){
        if(possibleMatch.length===2){
            alert("You have a new match <3");
            var match = new Match(possibleMatch[0],possibleMatch[1]);
            functionPost.insertMatch(match)
            app.getPotentialMatches(req,res)
        } else {
            app.getPotentialMatches(req,res)
        }
    } else {
        app.getPotentialMatches(req,res)
    }
    




                  
}

function dislike(req,res){
    //a number used so the azure function knows its dislike..since the same azure function is used for like and dislike
    var counter = 2; 
    var email = localStorage.getItem('email');
    var user2_id = localStorage.getItem('user2_id');

    functionPost.likeUser(email,user2_id,counter);

    app.getPotentialMatches(req,res)
}
module.exports = {
    like,
    dislike
    }; 