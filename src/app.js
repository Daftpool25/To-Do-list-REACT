import React, { createContext, useReducer, useState }  from 'react';
import {Route, Routes, BrowserRouter, Link} from "react-router-dom"
import Login from './components/login';
import Main from './components/main';
import { types } from './utils/actions';
import  "./styles/styles.scss"
import Register from './components/register';


// creo el estado inicial (no lo uso en este caso por ahora)
const initialState= {
        userName:"Daftpool",
        authState:true}


// creo el contexto
 export const authContext= React.createContext(null)
 let idCounter=0





function App() {

   //const [authState, setAuthState] = useState(initialState)


//!use Reduce

    //?initial state
    const listInitalState={list:[],loginState:{user:null, auth:false}};

    //?Reducer (is same way: state, action)pero no se hace el state=initaState
    const reducer = (state,action) =>{

        //Aqui es action.type xq no me busca directamente el valor de action
        //si no que lo setea cuando pongo el type y el payload
        switch (action.type) {

            case types.ADD_TODO:
                
                return{
                    ...state,
                    list:[...state.list,{
                        id: action.payload.id,
                        text:action.payload.text,
                        state:false
                    }]
                }
            case types.TOOGLE_TODO:

                return {...state, list:state.list.map( item => (item.id===action.payload.id)? {...item,state:!item.state}:item)}
           
            case types.LOGIN:

                return{
                    ...state,loginState:{user:action.payload.user, auth:true}
                }

            default:
                return state;
        }
    }


    //? Asign useReducer to State and dispatch actions
                                        //reducer //initialState
    const [state, dispatch] = useReducer(reducer,listInitalState)





   //hago el provider
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
                                    id:idCounter++
                                }
                            })}

                            
                            onClickState={(id) => dispatch({
                                type: types.TOOGLE_TODO,
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