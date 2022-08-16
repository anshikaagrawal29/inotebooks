import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';

const About = () => {
  const a = useContext(noteContext)
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
    }
    else
    {
      navigate("/login")
    }
    
  },[]);
  return (
    <div>
       <h1>This is About </h1>
    </div>
  )
}

export default About
