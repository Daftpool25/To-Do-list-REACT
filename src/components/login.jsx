import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../app'

function Login({submit}) {

    //creo mi consumer y le paso el nombre del contexto creado
    const context =useContext(authContext)

    const userName=useRef();
    const password=useRef();
    const navigate=useNavigate()


  return (
    <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={
            e => {e.preventDefault();
            submit(userName.current.value,password.current.value)}
        }>
            <input ref={userName} type="text" placeholder='User'/>
            <input ref={password} type="text" placeholder='Password'/>
            <button type='submit'>Login</button>
            <p onClick={()=> navigate("/register")}>Or Register...</p>

        </form>
    </div>
  )
}

export default Login