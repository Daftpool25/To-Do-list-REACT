import React, { createContext, useEffect, useReducer, useState }  from 'react';
import {Route, Routes, BrowserRouter, Link} from "react-router-dom"
import Login from './components/login';
import Main from './components/main';
import { types } from './utils/actions';
import  "./styles/styles.scss"
import Register from './components/register';
import { deleteData, getData, postData } from './controllers/general.controller';



// creo el contexto
 export const authContext= React.createContext(null)



function App() {

    function dispatchReRender(item){
        dispatch({
            type:types.RENDER,
            payload:{
                data:item
        }})
    }

    //!REDUCER
    const reducer = (state,action) =>{
        switch (action.type) {

            case types.RENDER:
                return{
                    ...state,list:action.payload.data
            }


            case types.ADD_TODO:
                postData("List", {text:action.payload.text, priority:1}).
                then( item => getData("List").then( item => dispatchReRender(item)
                ))
                return{...state}


            case types.TOOGLE_TODO:
                return {...state, list:state.list.map( item => (item.id===action.payload.id)? {...item,state:!item.state}:item)}
           


            case types.DELETE_TODO:
                 deleteData(`List/${action.payload.id}`).
                 then( item=> getData("List").then(item => dispatchReRender(item))                    )
                 
                return{ ...state}



            case types.LOGIN:
                return{
                    ...state,loginState:{user:action.payload.user, auth:true}
                }

            default:
                return {...state};
        }
    }

//!use Reduce


    //!initial state
    const listInitalState={list:[],loginState:{user:null, auth:false}};

    useEffect( () => {

        getData("List").then( item =>
            
            dispatch({
            type:"RENDER",
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
                <Link className="menuText" to="login">Login</Link>
                <Link className="menuText" to="/">Main</Link>
            </aside>
            <main>
                    <Routes>
                        <Route element={<Login
                            submit={
                                (user, password) => dispatch({
                                    type:types.LOGIN,
                                    payload:{
                                        user:user
                                    }
                                })
                            }
                        />} path="/login"/>


                        <Route element={<Register

                        />} path="/register"/>

                        
                        <Route element={<Main 
                        
                            submit={(text) => dispatch({
                                type:types.ADD_TODO,
                                payload:{
                                    text:text,
                                }
                            })}

                            
                            onClickState={(id) => dispatch({
                                type: types.TOOGLE_TODO,
                                payload:{
                                    id:id
                                }
                            })}

                            onClickDelete={(id) => dispatch({
                                type:types.DELETE_TODO,
                                payload:{
                                    id:id
                                }
                            })}

                        />} path="/" exact/>
                    </Routes>
            </main>
        </div>
    </BrowserRouter>
   </authContext.Provider>

  )
}

export default App