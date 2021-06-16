const express = require('express');
const server = express();
const cors = require('cors');
const fs = require('fs');
const responseTime = require('response-time')


var userData = fs.readFileSync('./Database/Users.json');
var Users = JSON.parse(userData);

var AdminData = fs.readFileSync('./Database/Admin.json')
var Admin = JSON.parse(AdminData);


server.use(cors());
server.use(express.static("public"));
server.use(responseTime())

server.get('/all', (req, res) => {
  res.send(Users);
})

server.get('/add/:username/:name/:email', (req, res) => {

  let userId = Object.keys(Users).length

  if (Users[userId]) userId++;

  let username = req.params.username;
  let name = req.params.name;
  let email = req.params.email;

  var user = {
    id: userId,
    username: username,
    name: name,
    email: email,
  }

  Users[userId] = user

  let UserDetails = JSON.stringify(Users, null, 2);
  fs.writeFile('./Database/Users.json', UserDetails, () => {
    console.log("data inserted");
  });

  res.send({
    status: "success"
  })

})

server.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  if (Users[id]) {
    delete Users[id];
    let UserDetail = JSON.stringify(Users, null, 2);
    fs.writeFile('./Database/Users.json', UserDetail, () => {
      console.log("user deleted")
    })
    res.send({
      status: "success",
      message: "user of id " + id + " has been deleted"
    })
  }
  else {
    res.send({
      status: "Failed",
      message: "user not found"
    })
  }
})

server.get('/delete', (req, res) => {

  let length = Object.keys(Users).length

  if (length === 0) {
    res.send({
      status: "Failed",
      message: "No user Found!"
    })
  }

  for (id in Users)
    delete Users[id];

  let UserDetails = JSON.stringify(Users, null, 2);
  fs.writeFile('./Database/Users.json', UserDetails, () => {
    console.log("data inserted");
  });

  res.send({
    status: "success"
  })
})


server.get("/admin/:username/:name/:email", (req, res) => {
  let username = req.params.username;
  let name = req.params.name;
  let email = req.params.email;

  if (Admin[username]) {
    res.send({
      Messsage: "username already Registered"
    })
  }

  let adminDetails = {
    Admin: username,
    name: name,
    email: email
  }

  Admin[username] = adminDetails;
  let AdminDetails = JSON.stringify(Admin, null, 2);
  fs.writeFile('./Database/Admin.json', AdminDetails, () => {
    console.log("Admin added");
  })

  res.send({
    status: "success",
    details: adminDetails
  })

})

server.get('/delete-admin/:username', (req, res) => {
  let username = req.params.username;
  if (Admin[username]) {
    delete Admin[username];
    let AdminData = JSON.stringify(Admin, null, 2);
    fs.writeFile('./Database/Admin.json', AdminData, () => { });
    res.send({
      status: "success 200",
      message: username + " is no more admin"
    })
  }
  res.send({
    status: "failed 404",
    message: "Admin not found"
  })
})

server.get('/delete-admins', (req, res) => {
  let length = Object.keys(Admin).length
  if (length === 0) {
    res.send({
      status: "404 Failed",
      message: "No admin found"
    })
  }
  for(id in Admin)
    delete Admin[id];

  let AdminData = JSON.stringify(Admin, null, 2);
  fs.writeFile('./Database/Admin.json', AdminData, () => {});
  res.send({
    status : "success",
    message : "All admins deleted successfully"
  })
})


server.get('/all-admins', (req, res) => {
  res.send(Admin);
})

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
})