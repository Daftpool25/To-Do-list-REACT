import React from 'react'
import deleteIcon from "../images/delete.svg"

function Row({id,text,state,onClickState,onClickDelete}) {
  return (
    <tr>
        <td>{id}</td>
        <td>{text}</td>
        <td onClick={() =>onClickState(id)}>{state? "Completed":"Active"}</td>
        <td><img onClick={()=>onClickDelete(id)} width="17px" src={deleteIcon} alt="deleteIcon"/></td>
    </tr>
  )
}

export default Row