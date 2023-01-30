import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../app'

function Register({register}) {

    const context =useContext(authContext)

    const userName=useRef();
    const password=useRef();
    const email=useRef();
    const navigate =useNavigate()



  return (
    <div className="loginContainer">
        <h1>Register</h1>
        <form onSubmit={
            e => {e.preventDefault();
            register(userName.current.value, email.current.value, password.current.value)}
        }>
            <input ref={userName} type="text" placeholder='User'/>
            <input ref={email} type="text" placeholder='exampl@email.com'/>
            <input ref={password} type="text" placeholder='Password'/>
            <button type='submit'>Register</button>
            <p onClick={()=> navigate("/login")}>Or login...</p>
        </form>
    </div>
  )
}

export default Register