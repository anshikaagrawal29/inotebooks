import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const[credentials, setCredentials] = useState({
    name: "",
    email : "",
    password : "",
    cpassword : ""
});

let navigate = useNavigate();
const onChange = (e) => {

    setCredentials({...credentials, [e.target.name] : e.target.value});
}

const handleSubmit = async (e) => {
        //Use this to prevent load of form
        e.preventDefault();
        const {name,email, password} = credentials;
        //fetch loogin user details
       const response = await fetch("http://localhost:5005/api/auth/createUser", {
            method: 'POST',
            headers : { 
                    'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name, email, password})
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
    
    <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" onChange={onChange} id="name" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="email" onChange={onChange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" minLength={5} required className="form-control" onChange={onChange} id="password"/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" name="cpassword" minLength={5} required className="form-control" onChange={onChange} id="cpassword"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
