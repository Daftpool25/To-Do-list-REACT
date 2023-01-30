import React, { useContext } from 'react'
import { authContext } from '../app'
import Filter from './filter'
import Form from './form'
import Row from './row'


function Main({submit,onClickState,onClickDelete, showAll,completed,active}) {

    //creo mi consumer y le paso el nombre del contexto creado
    const context =useContext(authContext)

  return (
    <div className="mainContainer">
        <h1>{context.loginState.auth? `Hello ${context.loginState.userName}`: "Please Login"}</h1>
        <table>
            <thead>
                <th>ID</th>
                <th>Activity</th>
                <th>State</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {context.list.map(item => <Row key={item.id} id={item.id} text={item.text} state={item.state} onClickState={onClickState} onClickDelete={onClickDelete}/>)}
            </tbody>
        </table>
        <Filter showAll={showAll} completed={completed} active={active}/>

        <Form submit={submit}/>
    </div>
  )
}

export default Main