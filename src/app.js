import React, { createContext, useEffect, useReducer, useState }  from 'react';
import {Route, Routes, BrowserRouter, Link} from "react-router-dom"
import Login from './components/login';
import Main from './components/main';
import { types } from './utils/actions';
import  "./styles/styles.scss"
import Register from './components/register';
import { deleteData, getData, postData } from './controllers/general.controller';
import { loginUser, registerUser } from './controllers/users.controller';
import { storage } from './utils/storage';
import toast, { Toaster } from 'react-hot-toast';



// creo el contexto
 export const authContext= React.createContext(null)

//TODO handle errors

function App() {

    function dispatchReRender(item){
        dispatch({
            type:types.RENDER,
            payload:{
                data:item
        }})
    }

    function setUser(email,userName,token){
        dispatch({
            type:types.SET_USER,
            payload:{
                email,
                userName,
                auth:true,
                token
        }})
    }

    //!REDUCER
    const reducer = (state,action) =>{
        switch (action.type) {

            case types.RENDER:
                return{
                    ...state,list:action.payload.data,listPure:action.payload.data
            }


            case types.ADD_TODO:
                postData("List", {text:action.payload.text, priority:1}).
                then( item => getData("List").then( item => {dispatchReRender(item);
                     toast.success("Success")}
                ))
                
                return{...state}


            case types.TOOGLE_TODO:
                return {...state, list:state.list.map( item => (item.id===action.payload.id)? {...item,state:!item.state}:item)}
           


            case types.DELETE_TODO:
                 deleteData(`List/${action.payload.id}`).
                 then( item=> getData("List").then(item => {dispatchReRender(item); 
                    toast.success("Success")})
                )
                 
                return{ ...state}


            case types.SET_USER:
                storage.setItem("token",action.payload.token);
                toast.success("Wellcome!")
                return {...state,loginState:{email:action.payload.email, userName:action.payload.userName, auth:action.payload.auth, token:action.payload.token}}



            case types.LOGIN:
                loginUser({email:action.payload.email,password:action.payload.password}).
                then(
                    item =>{ setUser(item.user.email, item.user.userName,item.token)}
                )

                return{...state}

            case types.REGISTER:
                const {userName,email,password}=action.payload;
                registerUser({userName,email,password}).then(
                    item => setUser(item.user.email, item.user.userName,item.token)
                )

                return {...state}

            case types.LOGOUT:
                storage.clear()
                toast.success("Bye")
                return {...state,loginState:{email:null, userName:null,token:null, auth:false}};

            case "SHOW_ALL":
                
                return {...state,list:state.listPure};

            case "COMPLETED":
                //!work every time whith state, you dont work with initalState
                const completed=state.listPure.filter( item => item.state)
                return {...state,list:completed};

            case "ACTIVE":
                const active=state.listPure.filter( item => !item.state)
                return {...state,list:active};

            default:
                return {...state};
        }
    }

//!use Reduce


    //!initial state
    const listInitalState={list:[],listPure:[],loginState:{email:null, userName:null,token:null, auth:false}};

    useEffect( () => {

        getData("List").then( item =>
            
            dispatch({
            type:types.RENDER,
            payload:{
                data:item
            }
        }))

    }, [])

    const [state, dispatch] = useReducer(reducer,listInitalState)


  return (
    <authContext.Provider value={state}>
        <BrowserRouter>

        <div>
            <aside>
                <Link className="menuText" to="login" onClick={
                    state.loginState.auth?
                    () => dispatch({
                        type:types.LOGOUT,
                        payload:{}
                    })
                    :
                    () => alert("You already are here")
                }>{state.loginState.auth? "logout":"login"}</Link>

                <Link className="menuText" to="/">Main</Link>
            </aside>
            <main>
                <Toaster toastOptions={{
                    className:'toast',
                    duration:8000
                }}/>
                    <Routes>
                        <Route element={

                            state.loginState.auth?

                            <Main
                                                    
                            submit={(text) => dispatch({
                                type:types.ADD_TODO,
                                payload:{
                                    text
                                }
                            })}

                            
                            onClickState={(id) => dispatch({
                                type: types.TOOGLE_TODO,
                                payload:{
                                    id
                                }
                            })}

                            onClickDelete={(id) => dispatch({
                                type:types.DELETE_TODO,
                                payload:{
                                    id
                                }
                            })}

                            //filter

                            completed={
                                () => dispatch({
                                    type:"COMPLETED",
                                    payload:{}
                                })
                            }

                            active={
                                () => dispatch({
                                    type:"ACTIVE",
                                    payload:{}
                                })
                            }

                            showAll={
                                () => dispatch({
                                    type:"SHOW_ALL",
                                    payload:{}
                                })
                            }
                            />
                            :                        
                            <Login
                                submit={
                                    (email, password) => dispatch({
                                        type:types.LOGIN,
                                        payload:{
                                            email,
                                            password
                                        }
                                    })
                                }
                            />
                        } path="/login"/>


                        <Route element={

                            state.loginState.auth?                            
                            <Main
                                                    
                            submit={(text) => dispatch({
                                type:types.ADD_TODO,
                                payload:{
                                    text
                                }
                            })}

                            
                            onClickState={(id) => dispatch({
                                type: types.TOOGLE_TODO,
                                payload:{
                                    id
                                }
                            })}

                            onClickDelete={(id) => dispatch({
                                type:types.DELETE_TODO,
                                payload:{
                                    id
                                }
                            })}

                            //filter

                            completed={
                                () => dispatch({
                                    type:"COMPLETED",
                                    payload:{}
                                })
                            }

                            active={
                                () => dispatch({
                                    type:"ACTIVE",
                                    payload:{}
                                })
                            }

                            showAll={
                                () => dispatch({
                                    type:"SHOW_ALL",
                                    payload:{}
                                })
                            }
                            />
                            :   
                            <Register
                                register={
                                    (userName,email,password) =>
                                    dispatch({
                                        type:types.REGISTER,
                                        payload:{
                                            userName,email,password
                                        }
                                    })
                                }

                            />
                        } path="/register"/>

                        
                        <Route element={
                            state.loginState.auth?
                            
                            <Main 
                        
                                submit={(text) => dispatch({
                                    type:types.ADD_TODO,
                                    payload:{
                                        text
                                    }
                                })}

                                
                                onClickState={(id) => dispatch({
                                    type: types.TOOGLE_TODO,
                                    payload:{
                                        id
                                    }
                                })}

                                onClickDelete={(id) => dispatch({
                                    type:types.DELETE_TODO,
                                    payload:{
                                        id
                                    }
                                })}

                                //filter

                                completed={
                                    () => dispatch({
                                        type:"COMPLETED",
                                        payload:{}
                                    })
                                }

                                active={
                                    () => dispatch({
                                        type:"ACTIVE",
                                        payload:{}
                                    })
                                }

                                showAll={
                                    () => dispatch({
                                        type:"SHOW_ALL",
                                        payload:{}
                                    })
                                }
                            />
                            :
                            <Login
                             submit={
                                    (email, password) => dispatch({
                                        type:types.LOGIN,
                                        payload:{
                                            email,
                                            password
                                        }
                                    })
                                }
                            />

                    } path="/" exact/>
                    </Routes>
            </main>
        </div>
    </BrowserRouter>
   </authContext.Provider>

  )
}

export default App