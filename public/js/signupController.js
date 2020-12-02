const user = [];

function createNewUser(req,res) {
console.log("hello");
user.push({
    username: req.body.username,
})

console.log(username)
}

module.exports = createNewUser; 