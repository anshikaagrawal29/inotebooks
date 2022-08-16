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
            if(json.success)
            {
                //storing in local storage
                let token = JSON.stringify(json);
                let parsedToken = JSON.parse(token)
                localStorage.setItem('token' ,parsedToken.authToken);
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
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange ={HandleonChange} id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name="password" value={credentials.password} onChange ={HandleonChange}  className="form-control" id="password"/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
