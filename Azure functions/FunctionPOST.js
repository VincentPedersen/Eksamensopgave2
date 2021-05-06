const axios = require('axios').default;
function signUp(user){
axios.post('http://localhost:7071/api/SignUp',
            {email:user.email,first_name:user.first_name,last_name:user.last_name,age:user.age,location:user.location,gender:user.gender,password:user.password},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
        }

function forgotPassword(email){
    axios.post('http://localhost:7071/api/ForgotPassword',
            {email:email},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}

function newPassword(email,hash){
    axios.post('http://localhost:7071/api/NewPassword',
            {email:email,hash:hash},
            function (error, response,body){
                if(!error && response.statusCode ==200){
                    console.log(body);
                }
            }
        )
}
module.exports = {
    signUp,
    forgotPassword,
    newPassword
}