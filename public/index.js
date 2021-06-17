
const url = "http://localhost:3001";

const AddUser = () => {
  let username = document.getElementById("username").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  fetch(`${url}/add/${username}/${name}/${email}`)
    .then(response => response.json())
    .then(res => {
      console.log(res)
      let message = document.getElementById("adduser-message")
      message.innerHTML = "User added successfully"
      message.className = "alert alert-success"
    })
    .catch(error => alert(error.message));
  renderData();

}

const AddAdmin = () => {
  let username = document.getElementById("admin-user-name").value;
  let name = document.getElementById("admin-name").value;
  let email = document.getElementById("admin-email").value;
  fetch(`${url}/admin/${username}/${name}/${email}`)
    .then(response => response.json())
    .then(res => {
      console.log(res)
      let message = document.getElementById("addadmin-message")
      message.innerHTML = "Admin added successfully"
      message.className = "alert alert-success"
    })
    .catch(error => alert(error.message));
  renderData();

}

const RemoveUser = () => {
  let id = document.getElementById("id");
  fetch(`${url}/delete/${id}`)
    .then(response => {
      console.log(response.json())
      var message = document.getElementById("removeuser-message")
      message.innerHTML = "User Removed successfully"
      message.className = "alert alert-success"
    })
    .catch(error => alert(error.message));
  renderData();
}

const RemoveAllUsers = () => {
  fetch(`${url}/delete`)
    .then(response => {
      console.log(response.json())
      let message = document.getElementById("removeall-message")
      message.innerHTML = "All users removed successfully"
      message.className = "alert alert-success"
    })
    .catch(error => alert(error.message));
  renderData();
}

const renderData = () => {
  fetch(`${url}/all`)
    .then(response => response.json())
    .then(res => {
      let len = Object.keys(res).length
      document.getElementById('total-users').innerHTML = len
    })
    .catch(err => alert(err.message))

}

const fetchUserData = () => {
  fetch(`${url}/all`)
    .then(response => response.json())
    .then(res => {
      let resArray = []
      for (var id in res) resArray.push(res[id])
      if(resArray.length == 0) 
      return document.getElementById("Details").innerHTML = `<p class = "error">No user Found !</p>`;
      const details = resArray.map((data) => {
        return `<div class = "details-grid">
              <p>username: ${data.username}</p>
              <p>name: ${data.name}</p>
              <p>email: ${data.email}</p>
            </div>`
      })

      document.getElementById("Details").innerHTML = details;

    })
    .catch(err => alert(err.message))

}

const fetchAdminData = () => {
  fetch(`${url}/all-admins`)
    .then(response => response.json())
    .then(res => {
      let resArray = []
      for (var id in res) resArray.push(res[id])
      if(resArray.length == 0) 
      return document.getElementById("Details").innerHTML = 
      `<p class = "error">
      No Admin Found !
      </p>`;
      const details = resArray.map((data) => {
        return `<div class = "details-grid">
        <p>username: ${data.Admin}</p>
        <p>name: ${data.name}</p>
        <p>email: ${data.email}</p>
      </div>`
      })

      document.getElementById("Details").innerHTML = details;

    })
    .catch(err => alert(err.message))

}