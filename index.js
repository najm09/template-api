const express = require('express');
const app = express();
const fs = require('fs');

var data = fs.readFileSync('data.json');
var details = JSON.parse(data);
console.log(details)


app.listen(8080, serving);

app.get('/all', (req,res) => {
	res.send(details);
});


app.get('/:username/:password', (req, res) => {
	var user = req.params.username;
	var password = req.params.password;
	details[user] = password;
	var users = JSON.stringify(details, null, 2);
	fs.writeFile('data.json', users, (err)=> {
		if(err){
			console.log("Error!!!");
		}
	})
	res.send({
		status : "success",
		user : user,
		password : password
	})
})



function serving(){
	console.log('server listening at port 8080');
}