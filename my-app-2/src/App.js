import React,{ useState, useEffect } from 'react';
import './App.css';
import Users from './components/users.js'
function App() {
  console.log("in App");
  const [users,setUsers] = useState([]);

  const [first_name,setFirstName] = useState("");
  const [last_name,setLastName] = useState("");
  const [contact_number,setContact] = useState("");
  const [email_id,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm_password,setConfirmPassword] = useState("");

  const addUser = () => {
    console.log("in addUser");
    if(password === confirm_password){
    fetch("http://localhost:3001/users",
      {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({user: {first_name: first_name, last_name: last_name,
         contact_number: contact_number, password: password, email_id: email_id}})
      }).then((result) => {
        if (result.status === 200) {
          alert("User Created.");
          console.log(result);
          //setUsers(result.data)
          setFirstName();
          setLastName();
          setEmail();
          setContact();
          setPassword();
          setConfirmPassword();
          return result.json();
        }
      }).then((parsedResult) => {
        setUsers(parsedResult)
      })
      .catch((err) => {console.log("Couldn't add User !!!");})
      }
      else {
        alert("both passwords should match !!!");
      }
    }

   useEffect(() => {
     console.log("in useEffect");
     fetch('http://localhost:3001/users').then((jsonResponse) => {
       return jsonResponse.json();
     }).then((parsedResponse) => {
       //console.log(parsedResponse);
       setUsers(parsedResponse)
     }).catch((err) => {
       console.log("Error");
     })
   },[]);


  return(
    <>
    <h2 align="center">New User Form</h2>
    <table align="center">
    <thead>
    <tr>
      <td> First Name:</td>
      <td><input type="text" id="first_name" name="first_name" value={first_name} onChange={e => setFirstName(e.target.value)} required/></td>
    </tr>
    <tr>
      <td> Last Name:</td>
      <td><input type="text" id="last_name" name="last_name" onChange={e => setLastName(e.target.value)} required/></td>
    </tr>
    <tr>
      <td> Contact:</td>
      <td><input type="text" id="contact_number" name="contact_number" onChange={e => setContact(e.target.value)} required/></td>
    </tr>
    <tr>
      <td> Email_id:</td>
      <td><input type="text" id="email_id" name="email_id" onChange={e => setEmail(e.target.value)} required/></td>
    </tr>
    <tr>
      <td> Password:</td>
      <td><input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} required/></td>
    </tr>
    <tr>
      <td> Confirm Password:</td>
      <td><input type="password" id="confirm_password" name="confirm_password" onChange={e => setConfirmPassword(e.target.value)} required/></td>
    </tr>
    <tr>
      <td colSpan="2" align="center">
        <button type="button" name="addUser" id="addUser" onClick={addUser}>Add User</button>
      </td>
    </tr>
    </thead>
    </table>

    <br/>

    <h3 align="center">Registered Users</h3>
    <table align="center" border="1">
    <thead>
      <tr>
        <th>Name</th><th>Contact</th><th>Email</th><th>Operation</th>
      </tr>
    </thead>
    <Users names={users}/>
    </table>
    </>
  );
}

export default App;
