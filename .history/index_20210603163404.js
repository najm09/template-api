const express = require('express');
const app = express();
const fs = require('fs');
var cors = require('cors')


var data = fs.readFileSync('data.json');
var details = JSON.parse(data);

app.use(express.static('public'));
app.use(cors())


app.listen(8080, serving);

app.get('/all', (req,res) => {
	var files = {
		data : details,
	}	
	res.send(files);
});


app.get('/add/:username/:password', (req, res) => {
	var user = req.params.username;
	var password = req.params.password;
	details[user] = password;
	var fileData = JSON.stringify(details, null, 2);
	fs.writeFile('data.json', fileData, (err)=> {
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


app.get('/search/:name', (req, res) => {
	var name = req.params.name;
	var reply ;
	if(details[name]){
		reply = {
			status : "success",
			name : name,
			email : details[name]
		}
		res.send(reply);
	}
	else{
		reply = {
			status : "Failed",
			name : name,
			message : "Not found !"
		}
		res.send(reply);
	}
})

app.get('/delete/:name', (req, res) => {
	var name = req.params.name;
	delete details[name];
	var reply = {
		status : "deleted",
		name : name,
	}
	res.send(reply);
})


function serving(){
	console.log('server listening at port 8080');
}