const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))




//controller require 
const signupController = require('./public/js/signupController')

app.use(express.static(path.join(__dirname, 'public')));
/*
router.get('/',function(req,res){
  res.sendFile(path.resolve(__dirname+'/Client/index.html'));
  //__dirname : It will resolve to your project folder.
});
*/
app.get('/',(req,res,next)=>{
    res.render('welcome')
})

app.get('/signup',(req,res,next)=>{
    res.render('signup')
})
app.post('/signup',signupController)


app.engine('hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}))
app.set('view engine','.hbs')


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');