import React from 'react';

function Users(props){
  let {names} = props;
  console.log("in Users");

  const deleteUser = (id) =>{
    console.log(id);
    fetch('http://localhost:3001/users/'+id,
  {
    method: 'DELETE'
  }).then((result) => {
  if(result.status === 200){
    console.log("Deleted Successfully");
    return result.json();
  }
}).then((parsedResult) => {console.log(parsedResult);})
  .catch((err) => {console.log("Error!!!");})
  }

  return(
    <tbody>
      {
        names.map((user,i) => {
          let {id,first_name,last_name,contact_number, email_id} = user;
          return(
            <tr key={i}>
              <td>{id}</td>
              <td>{`${first_name} ${last_name}`}</td>
              <td>{contact_number}</td>
              <td>{email_id}</td>
              <td align="center"><button onClick={() => deleteUser(id)}>delete</button></td>
            </tr>
          );
        })
      }
    </tbody>
  );
}

export default Users;
