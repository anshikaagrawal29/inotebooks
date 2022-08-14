import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const[credentials, setCredentials] = useState({
        email : "",
        password : ""
    });

    let navigate = useNavigate();
    const HandleonChange = (e) => {

        setCredentials({...credentials, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e) => {
            //Use this to prevent load of form
            e.preventDefault();
            //fetch loogin user details
           const response = await fetch("http://localhost:5005/api/auth/login", {
                method: 'POST',
                headers : { 
                        'Content-Type' : 'application/json'
                },
                body : JSON.stringify({email : credentials.email,password : credentials.password})
            });
            const json = await response.json();
            console.log(json);
            if(json.success)
            {
                //storing in local storage
                localStorage.setItem('token' , json.authtoken);
                //redirect
                navigate('/')

            }
            else{
                    alert("Invalid Credentials");
            }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" name="email" value={credentials.email} onChange ={HandleonChange} id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" name="password" value={credentials.password} onChange ={HandleonChange}  class="form-control" id="password"/>
  </div>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
